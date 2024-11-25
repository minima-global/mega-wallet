import * as Yup from "yup";
import { Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";

import TokenSelect from "../TokenSelect";
import { appContext } from "../../AppContext";
import FetchBalanceButton from "../FetchBalanceButton";
import { primaryFormButtonStyle } from "../../styles";

const yupValidator = Yup.object().shape({
  token: Yup.object().required("Token field required"),
  amount: Yup.number()
    .typeError("Must be a number") // Ensures input is a valid number
    .positive("Must be greater than zero") // Ensure it's a positive number
    .required("Field is required")
    .test(
      "is-decimal",
      'Invalid number. Make sure to use only digits, "." for decimals and no separators for thousands (e.g., 1000.234)',
      (value) => /^[^a-zA-Z\\;',"]+$/.test(value?.toString()), // Custom regex to match digits and decimals
    ),
  address: Yup.string()
    .matches(/0|M[xX][0-9a-zA-Z]+/, "Invalid address")
    .min(59, "Invalid address, too short")
    .max(66, "Invalid address, too long")
    .required("Field required"),
  keyuses: Yup.number()
    .typeError("Must be a number") // Ensures input is a valid number
    .positive("Must be greater than zero") // Ensure it's a positive number
    .required("Field is required")
    .integer("Must be a whole number")
    .max(250000)
    .nullable(),
});

const Send = () => {
  const {
    _keyUsages,
    _privateKey,
    _script,
    _currentNavigation,
    _balance,
    _address,
    promptDialogWithMessage,
    promptDialogWithError,
    updateKeyUsage,
  } = useContext(appContext);

  const myForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      ready.current = true;
    }, 1000);
  }, []);

  if (!_balance) {
    return null;
  }

  const page = "send";

  return (
    <div
      className={`transition-opacity duration-200 ${_currentNavigation === page ? "opacity-100 w-full" : "opacity-0 w-full h-0 scale-0 pointer-events-none"}`}
    >
      <section>
        <div className="flex items-center justify-between">
          <h6 className="text-xl lg:text-2xl mb-1 lg:mb-4">Tokens</h6>
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
              if (!respo.status) {
                setLoading(false);
                setSubmitting(false);

                promptDialogWithError(respo.error as string);
                return;
              }

              if (respo.status) {
                // update keyUsages
                updateKeyUsage(_address, Number(keyuses) + 1);

                setLoading(false);

                resetForm();

                promptDialogWithMessage(
                  "Your transaction has been successfully sent!",
                );
              }
            });
          }}
          validateOnMount={true}
          validationSchema={yupValidator}
        >
          {({
            getFieldProps,
            setFieldValue,
            errors,
            touched,
            isValid,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="h-full flex flex-col md:block">
              <form
                ref={myForm}
                onSubmit={handleSubmit}
                className="gap-4 my-4 flex flex-col flex-grow"
              >
                <div className="flex-grow space-y-4">
                  <div className="mb-8">
                    <TokenSelect _balance={_balance} />
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <div className="dark:text-grey40 mb-3">Amount</div>
                      <div
                        className={`bg-grey10 dark:bg-darkContrast px-4 py-3.5 rounded ${touched.amount && errors.amount ? "border border-red" : ""}`}
                      >
                        <div className="flex">
                          <input
                            disabled={isSubmitting}
                            required
                            {...getFieldProps("amount")}
                            placeholder="Enter amount"
                            className="text-sm bg-transparent w-full placeholder-grey60 appearance-none outline-none"
                          />
                        </div>
                      </div>
                      {touched.amount && errors.amount && (
                        <div className="pt-3 text-red text-xs rounded">
                          {errors.amount}.
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="darkLtext-grey40 mb-3">
                        Recipient address
                      </div>
                      <div
                        className={`bg-grey10 dark:bg-darkContrast px-4 py-3.5 rounded ${touched.address && errors.address ? "border border-red" : ""}`}
                      >
                        <div className="flex">
                          <input
                            autoComplete="off"
                            disabled={isSubmitting}
                            type="text"
                            required
                            {...getFieldProps("address")}
                            placeholder="Enter recipient address (Mx or 0x)"
                            className={`text-sm bg-transparent w-full placeholder-grey60 appearance-none outline-none`}
                          />
                        </div>
                      </div>
                      {touched.address && errors.address && (
                        <div className="pt-3 text-red text-xs rounded">
                          {errors.address}.
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="dark:text-grey40 mb-3">Key uses</div>
                      <div className="bg-grey10 dark:bg-darkContrast px-4 py-3.5 rounded">
                        <div className="flex relative">
                          <input
                            autoComplete="off"
                            disabled={isSubmitting}
                            required
                            {...getFieldProps("keyuses")}
                            placeholder="Amount of times "
                            className="text-sm bg-transparent w-full placeholder-grey60 appearance-none outline-none"
                          />
                          <div className="flex gap-1">
                            <button
                              type="button"
                              disabled={getFieldProps("keyuses").value == "1"}
                              className="disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 active:scale-90 w-[22px] h-[22px] flex items-center justify-center p-0 bg-white dark:bg-mediumDarkContrast border border-grey40 dark:border-lightDarkContrast"
                              onClick={() =>
                                setFieldValue(
                                  "keyuses",
                                  getFieldProps("keyuses").value > 1
                                    ? String(
                                        Number(getFieldProps("keyuses").value) -
                                          1,
                                      )
                                    : 1,
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-black dark:stroke-white w-[12px]"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  "keyuses",
                                  String(
                                    Number(getFieldProps("keyuses").value) + 1,
                                  ),
                                )
                              }
                              className="disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 active:scale-90 w-[22px] h-[22px] flex items-center justify-center p-0 bg-white dark:bg-mediumDarkContrast border border-grey40 dark:border-lightDarkContrast"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-black dark:stroke-white w-[12px]"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                        {touched.keyuses &&
                          errors.keyuses &&
                          typeof errors.keyuses === "string" && (
                            <span className="text-xs text-neutral-600 dark:text-neutral-100 rounded">
                              {errors.keyuses}
                            </span>
                          )}
                      </div>
                    </div>
                    <p className="text-xs lg:text-sm text-grey60">
                      You must change your key uses number on every transaction.
                      This will increment automatically when you use the same
                      computer, but you must set it yourself if you change
                      machines.
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    disabled={ready.current === true && (loading || !isValid)}
                    type="submit"
                    className={`${primaryFormButtonStyle} mt-2 lg:my-8`}
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
    </div>
  );
};

export default Send;
