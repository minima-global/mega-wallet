import { useFormikContext } from "formik";
import { useContext, useEffect } from "react";
import { appContext } from "../../AppContext";
import Tooltip from "../Tooltip";

const KeyUsage = () => {
  const { _keyUsages, _address } = useContext(appContext);
  const formik: any = useFormikContext();

  useEffect(() => {
    formik.setFieldValue(
      "keyuses",
      _keyUsages && _keyUsages[_address] > 0 ? _keyUsages[_address] : 1
    );
  }, [_keyUsages, _address]);

  return (
    <label className="grid gap-1 relative">
      <div className="flex justify-between">
        <span className="ml-4 text-sm text-teal-500">Key uses</span>

        <Tooltip message="Keeping your key use number different on every transaction mantains your anonymity.">
          <svg
            className="text-orange-400"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
        </Tooltip>
      </div>

      <input
        disabled={formik.isSubmitting}
        required
        {...formik.getFieldProps("keyuses")}
        type="number"
        placeholder="Number of uses"
        className={`mb-2 ${
          formik.touched.keyuses && formik.errors.keyuses
            ? "outline !outline-red-500"
            : ""
        }`}
      />
      {formik.touched.keyuses && formik.errors.keyuses && (
        <span className="my-2 bg-red-500 rounded px-4 py-1">
          {formik.errors.keyuses}
        </span>
      )}
    </label>
  );
};

export default KeyUsage;
