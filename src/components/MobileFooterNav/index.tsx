import { useContext } from "react";
import { appContext } from "../../AppContext";

const NavButton = ({ name, icon, isActive, onClick }) => (
  <button
    className={`flex flex-col items-center justify-center py-2 px-4 transition-all duration-200 ${
      isActive
        ? "shadow-inner text-[#1b1b1b] dark:text-neutral-100"
        : "text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
    }`}
    disabled={isActive}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    {icon}
    <span className={`text-xs mt-1 ${isActive ? "font-bold" : "font-medium"}`}>
      {name}
    </span>
  </button>
);

const MobileFooterNav = () => {
  const { _currentNavigation, handleNavigation } = useContext(appContext);

  const navItems = [
    {
      name: "Balance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
          <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
        </svg>
      ),
    },
    {
      name: "Send",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 10h-16l5.5 -6" />
          <path d="M4 14h16l-5.5 6" />
        </svg>
      ),
    },
    {
      name: "Receive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 18v3h16v-14l-8 -4l-8 4v3" />
          <path d="M4 14h9" />
          <path d="M10 11l3 3l-3 3" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-white dark:bg-neutral-900 shadow-lg block md:hidden">
      <nav aria-label="Footer Navigation">
        <div className="grid grid-cols-3 px-4">
          {navItems.map((item) => (
            <NavButton
              key={item.name}
              name={item.name}
              icon={item.icon}
              isActive={_currentNavigation === item.name.toLowerCase()}
              onClick={() => handleNavigation(item.name.toLowerCase())}
            />
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default MobileFooterNav;
