import { Check } from "lucide-react";

interface ModernCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function ModernCheckbox({
  label,
  checked,
  onChange,
}: ModernCheckboxProps) {
  return (
    <label className="flex items-center space-x-1 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`
          w-5 h-5 border-2 rounded
          transition-colors duration-200 ease-in-out
          ${
            checked
              ? "border-lightOrange"
              : "border-grey60 group-hover:border-blue-500"
          }
        `}
        >
          <Check
            className={`
              w-4 h-4 text-lightOrange absolute font-bold
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              transition-opacity duration-100 ease-in-out
              ${checked ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>
      </div>
      <span className="text-sm text-black dark:text-grey40 dark:text-neutral-300 select-none pl-3">
        {label}
      </span>
    </label>
  );
}
