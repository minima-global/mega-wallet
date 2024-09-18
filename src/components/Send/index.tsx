import { useContext, useRef, useState } from "react";
import { appContext } from "../../AppContext";
import TokenSelect from "../TokenSelect";
import { useSpring, animated, config } from "react-spring";
import * as Yup from "yup";
import { Formik } from "formik";
import FetchBalanceButton from "../FetchBalanceButton";
import {
  inputWrapperStyle,
  primaryFormButtonStyle,
  titleStyle,
  wrappedInputStyle,
} from "../../styles";

const yupValidator = Yup.object().shape({
  token: Yup.object().required("Token field required"),
  amount: Yup.number()
    .typeError("Amount must be a number") // Ensures input is a valid number
    .positive("Amount must be greater than zero") // Ensure it's a positive number
    .required("Amount field is required")
    .test(
      "is-decimal",
      'Invalid number. Make sure to use only digits, "." for decimals and no separators for thousands (e.g., 1000.234)',
      (value) => /^[^a-zA-Z\\;',"]+$/.test(value?.toString()), // Custom regex to match digits and decimals
    )
    .nullable(),
  address: Yup.string()
    .matches(/0|M[xX][0-9a-zA-Z]+/, "Invalid address")
    .min(59, "Invalid address, too short")
    .max(66, "Invalid address, too long")
    .required("Address field required")
    .nullable(),
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
      <section>
        <div className="flex justify-between">
          <h3 className={titleStyle}>Transfer tokens</h3>
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
              console.log(respo);
              if (!respo.status) {
                setLoading(false);
                setSubmitting(false);

                promptDialogWithError(respo.error as string);
                return;
              }

              if (respo.status) {
                // update keyUsages
                // updateKeyUsage(_address, keyuses + 1);

                setLoading(false);

                resetForm();

                promptDialogWithMessage(
                  "Your transaction has been successfully sent!",
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
            <div className="min-h-[calc(100vh_-_200px)] flex flex-col md:block">
              <form
                ref={myForm}
                onSubmit={handleSubmit}
                className="gap-4 my-4 flex flex-col flex-grow"
              >
                <div className="flex-grow space-y-4">
                  <div className={`${inputWrapperStyle}`}>
                    <label className="text-xs text-neutral-400 dark:text-neutral-500">
                      Enter amount
                    </label>
                    <div className="flex">
                      <input
                        disabled={isSubmitting}
                        type="number"
                        step="any"
                        required
                        {...getFieldProps("amount")}
                        placeholder="Your amount"
                        className={`${wrappedInputStyle} font-mono text-lg flex-grow ${touched.amount && errors.amount && "underline"} `}
                      />

                      <TokenSelect _balance={_balance} />
                    </div>

                    {touched.amount && errors.amount && (
                      <span className="text-xs text-neutral-600 dark:text-neutral-100 rounded">
                        {errors.amount}
                      </span>
                    )}
                  </div>

                  <div className={`${inputWrapperStyle}`}>
                    <label className="text-xs text-neutral-400 dark:text-neutral-500">
                      Enter recipient address
                    </label>
                    <div className="flex">
                      <input
                        autoComplete="off"
                        disabled={isSubmitting}
                        type="text"
                        required
                        {...getFieldProps("address")}
                        placeholder="Mx/0x"
                        className={`${wrappedInputStyle} font-mono text-lg flex-grow ${touched.address && errors.address && "underline"}`}
                      />
                    </div>

                    {touched.address && errors.address && (
                      <span className="text-xs text-neutral-600 dark:text-neutral-100 rounded">
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    disabled={loading || !isValid}
                    type="submit"
                    className={`${primaryFormButtonStyle} my-8`}
                  >
                    {loading && "Sending..."}
                    {!loading && "Send"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </section>
    </animated.div>
  );
};

export default Send;
