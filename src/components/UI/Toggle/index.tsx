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
          w-6 h-6 border-2 rounded-md
          transition-colors duration-200 ease-in-out
          ${
            checked
              ? "bg-blue-500 border-blue-500"
              : "bg-white border-gray-300 group-hover:border-blue-500"
          }
        `}
        >
          <Check
            className={`
              w-4 h-4 text-white absolute
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              transition-opacity duration-200 ease-in-out
              ${checked ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700 select-none">
        {label}
      </span>
    </label>
  );
}
