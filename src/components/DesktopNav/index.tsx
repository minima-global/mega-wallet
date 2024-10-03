import { useContext } from "react";
import { appContext } from "../../AppContext";

const NavButton = ({ name, icon, activeIcon, isActive, onClick }) => (
  <button
    className={`flex-1 w-full relative text-sm text-left flex rounded py-2.5 px-4 items-center justify-start gap-2 transition-all duration-200 ${
      isActive ? "bg-lightOrange text-black" : "bg-black"
    }`}
    disabled={isActive}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    <span className={`${isActive ? "font-semibold" : "font-medium"}`}>
      {name}
    </span>
    <div className="absolute right-0 px-4 fill-lightOrange">
      {isActive ? activeIcon : icon}
    </div>
  </button>
);

const DesktopNav = () => {
  const { _currentNavigation, handleNavigation } = useContext(appContext);

  const navItems = [
    {
      name: "Balance",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-lightOrange"
        >
          <path
            d="M2.95832 13.5V6.58332H4.04166V13.5H2.95832ZM7.79166 13.5V6.58332H8.87499V13.5H7.79166ZM0.974365 15.5833V14.5H15.6923V15.5833H0.974365ZM12.625 13.5V6.58332H13.7083V13.5H12.625ZM0.974365 5.58332V4.06416L8.33332 0.464783L15.6923 4.06416V5.58332H0.974365ZM2.5752 4.49999H14.0914L8.33332 1.68749L2.5752 4.49999Z"
            fill="currentColor"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-black"
        >
          <path
            d="M2.95832 13.5V6.58332H4.04166V13.5H2.95832ZM7.79166 13.5V6.58332H8.87499V13.5H7.79166ZM0.974365 15.5833V14.5H15.6923V15.5833H0.974365ZM12.625 13.5V6.58332H13.7083V13.5H12.625ZM0.974365 5.58332V4.06416L8.33332 0.464783L15.6923 4.06416V5.58332H0.974365ZM2.5752 4.49999H14.0914L8.33332 1.68749L2.5752 4.49999Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Send",
      icon: (
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-lightOrange"
        >
          <path
            d="M1.64116 10.7036L0.875122 9.93751L9.51304 1.29168H1.787V0.208344H11.3703V9.79168H10.287V2.06564L1.64116 10.7036Z"
            fill="currentColor"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-black"
        >
          <path
            d="M1.64116 10.7036L0.875122 9.93751L9.51304 1.29168H1.787V0.208344H11.3703V9.79168H10.287V2.06564L1.64116 10.7036Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Receive",
      icon: (
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-lightOrange"
        >
          <path
            d="M10.0257 0.296448L10.7917 1.06249L2.15383 9.70832H9.87987V10.7917H0.296539V1.20832H1.37987V8.93436L10.0257 0.296448Z"
            fill="currentColor"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black"
        >
          <path
            d="M10.0257 0.296448L10.7917 1.06249L2.15383 9.70832H9.87987V10.7917H0.296539V1.20832H1.37987V8.93436L10.0257 0.296448Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="w-full justify-center hidden md:flex pb-5"
      aria-label="Main Navigation"
    >
      <ul className="flex w-full gap-3">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1">
            <NavButton
              name={item.name}
              icon={item.icon}
              activeIcon={item.activeIcon}
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
