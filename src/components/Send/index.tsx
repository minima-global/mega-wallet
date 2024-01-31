import { useContext, useRef, useState } from "react";
import styles from "./Balance.module.css";
import { appContext } from "../../AppContext";
import TokenSelect from "../TokenSelect";
import { useSpring, animated, config } from "react-spring";
import * as Yup from "yup";
import { Formik } from "formik";
import KeyUsage from "../KeyUsage";
import FetchBalanceButton from "../FetchBalanceButton";

const yupValidator = Yup.object().shape({
  token: Yup.object().required("Token field required"),
  amount: Yup.string()
    .required("Amount field required")
    .matches(
      /^[^a-zA-Z\\;'",]+$/,
      'Invalid number.  Make sure to use only digits, "." for decimals and nothing for thousands. (e.g 1000.234)'
    )
    .nullable(),
  address: Yup.string()
    .matches(/0|M[xX][0-9a-zA-Z]+/, "Invalid address")
    .min(59, "Invalid address, too short")
    .max(66, "Invalid address, too long")
    .required("Address field required")
    .nullable(),
  keyuses: Yup.number().max(
    250000,
    "Number must be less than or equal to 250000."
  ),
});

const Send = () => {
  const {
    _keyUsages,
    _privateKey,
    _script,
    _promptLogin,
    _currentNavigation,
    _balance,
    _address,
    promptDialogWithMessage,
    promptDialogWithError,
    updateKeyUsage,
  } = useContext(appContext);

  const myForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const springProps = useSpring({
    opacity: _currentNavigation === "send" ? 1 : 0,
    transform:
      _currentNavigation === "send"
        ? "translateY(0%) scale(1)"
        : "translateY(-50%) scale(1)",
    config: config.gentle,
  });

  if (_currentNavigation !== "send" || _promptLogin) {
    return null;
  }

  if (!_balance) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin mx-auto"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
        <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
        <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
        <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
        <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
      </svg>
    );
  }

  return (
    <animated.div style={springProps}>
      <section className={styles["tokens"]}>
        <div className="flex justify-between">
          <h6>Transfer tokens</h6>
          <FetchBalanceButton />
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            token: _balance ? _balance[0] : null,
            amount: "",
            address: "",
            keyuses:
              _keyUsages && _keyUsages[_address] > 0 ? _keyUsages[_address] : 1,
          }}
          onSubmit={(formData, { resetForm, setSubmitting }) => {
            setLoading(true);
            const { token, address, amount, keyuses } = formData;

            // const keyuses = utils.randomInteger(1, 150000);

            const rawTransaction = `sendfrom fromaddress:${_address} address:${address} amount:${amount} tokenid:${token.tokenid} script:"${_script}" privatekey:${_privateKey} keyuses:${keyuses}`;

            (window as any).MDS.cmd(rawTransaction, function (respo) {
              // console.log(respo);
              if (!respo.status) {
                setLoading(false);
                setSubmitting(false);

                promptDialogWithError(respo.error as string);
                return;
              }

              if (respo.status) {
                // update keyUsages
                updateKeyUsage(_address, keyuses + 1);

                setLoading(false);

                resetForm();

                promptDialogWithMessage(
                  "Your transaction has been successfully sent!"
                );
              }
            });
          }}
          validationSchema={yupValidator}
        >
          {({
            getFieldProps,
            errors,
            touched,
            isValid,
            handleSubmit,
            isSubmitting,
          }) => (
            <form ref={myForm} onSubmit={handleSubmit} className="grid">
              <TokenSelect _balance={_balance} />
              <input
                disabled={isSubmitting}
                required
                {...getFieldProps("amount")}
                type="text"
                placeholder="Your amount"
                className={`mb-2 ${
                  touched.amount && errors.amount
                    ? "outline !outline-red-500"
                    : ""
                }`}
              />
              {touched.amount && errors.amount && (
                <span className="my-2 bg-red-500 rounded px-4 py-1">
                  {errors.amount}
                </span>
              )}
              <input
                disabled={isSubmitting}
                required
                autoComplete="off"
                {...getFieldProps("address")}
                type="text"
                placeholder="Recipient address"
                className={`mb-2 ${
                  touched.address && errors.address
                    ? "outline !outline-red-500"
                    : ""
                }`}
              />
              {touched.address && errors.address && (
                <span className="my-2 bg-red-500 rounded px-4 py-1">
                  {errors.address}
                </span>
              )}

              <KeyUsage />

              {/* <label className="grid gap-1 relative">
                <span className="mx-4 text-sm text-teal-500">Secret code</span>
                <input
                  readOnly
                  autoComplete="off"
                  {...getFieldProps("code")}
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Secret code"
                  className="mb-4"
                />
                <button
                  className="absolute text-teal-500 right-6 top-10 active:outline-none !border-none focus:border-none hover:border-none focus:outline-none p-0"
                  onClick={handleToggleVisibility}
                >
                  {!visibility && (
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  )}

                  {!!visibility && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                      <path d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </label> */}

              <button
                disabled={loading || !isValid}
                type="submit"
                className=" p-4 bg-teal-500 text-lg font-bold mt-4 disabled:text-gray-900 disabled:cursor-not-allowed disabled:bg-teal-800 text-black"
              >
                {loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin text-yellow-800 mx-auto"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
                    <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
                    <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
                    <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
                    <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
                    <path d="M12 9l-2 3h4l-2 3" />
                  </svg>
                )}

                {!loading && "Send"}
              </button>
            </form>
          )}
        </Formik>
      </section>
    </animated.div>
  );
};

export default Send;
