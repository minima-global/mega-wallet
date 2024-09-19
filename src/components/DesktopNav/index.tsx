import { useContext } from "react";
import { appContext } from "../../AppContext";

const NavButton = ({ name, icon, isActive, onClick }) => (
  <button
    className={`flex !p-4 !px-8 items-center justify-center gap-2 transition-all duration-200 ${
      isActive
        ? "bg-black  text-white dark:text-neutral-100 border-b-2 border-neutral-500"
        : "bg-[#f0f0f0] dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 hover:bg-[#e8e8e8] dark:hover:bg-[#303030]"
    }`}
    disabled={isActive}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    {icon}
    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
      {name}
    </span>
  </button>
);

const DesktopNav = () => {
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
    <nav
      className=" justify-center p-2 hidden md:flex"
      aria-label="Main Navigation"
    >
      <ul className="flex space-x-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavButton
              name={item.name}
              icon={item.icon}
              isActive={_currentNavigation === item.name.toLowerCase()}
              onClick={() => handleNavigation(item.name.toLowerCase())}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
