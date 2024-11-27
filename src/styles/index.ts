export const wrappedInputStyle = `
  bg-transparent
  focus:outline-none
  w-full
  pr-4
  text-sm lg:text-base
  placeholder:text-neutral-400
  placeholder:dark:text-neutral-500
  text-neutral-950
  dark:text-neutral-100
  overflow-hidden
  whitespace-nowrap
`;
export const primaryFormButtonStyle = `
  w-full py-3.5 px-4 tracking-wide rounded-md
  transition-colors
  text-sm lg:text-base
  bg-lightOrange hover:bg-lighterOrange active:bg-lighterOrange

  text-black
  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-lightOrange

  focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50
  dark:focus:ring-neutral-400 dark:focus:ring-opacity-60
`;
export const outlineFormButtonStyle = `
  w-full py-3 px-4 tracking-wide rounded-md
  transition-colors
  text-sm lg:text-base

  text-white hover:text-grey40

  focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50
  dark:focus:ring-neutral-400 dark:focus:ring-opacity-60
`;

export const inputWrapperStyle =
  "flex flex-col border-none bg-grey20 dark:bg-darkContrast px-4 py-3.5 rounded-lg justify-center";
export const selectableTokenWrapperStyle =
  "hover:cursor-pointer flex items-center gap-1 bg-neutral-50 border dark:border-none dark:bg-neutral-950 rounded-full px-2 hover:bg-neutral-150 dark:hover:bg-neutral-900 hover:outline hover:outline-neutral-900";
export const searchInputStyle =
  "p-3 px-6 bg-neutral-100 dark:placeholder:text-neutral-500 rounded-full dark:bg-[#1B1B1B] w-full my-4 focus:outline-none focus:border-neutral-500 dark:text-neutral-200";
export const searchWrapperStyle = "flex bg-neutral-800 p-4 rounded-full gap-1";
export const tokenWrapperStyle =
  "flex hover:bg-neutral-700 hover:cursor-pointer w-full py-2 px-3";
export const appNavigationStyle =
  "px-3 dark:text-neutral-500 cursor-pointer hover:dark:text-neutral-400 font-bold";
export const homeNavigationStyle =
  "font-bold dark:text-neutral-500 cursor-pointer hover:dark:text-neutral-400 p-4 py-2 rounded-lg";
export const activeAppNavigationStyle = "dark:!text-neutral-400";
export const activeNavigationStyle =
  "dark:bg-neutral-950 dark:!text-neutral-400";
export const titleStyle =
  "flex-grow font-bold tracking-wide dark:text-neutral-400";
export const holdingContainerStyle = "dark:bg-[#1B1B1B] p-4 rounded-lg mx-auto";
export const avatarWrapperStyle = "w-6 h-6 overflow-hidden rounded-full";
export const nftCardButtonStyle =
  "bg-[#1B1B1B] w-full font-bold hover:bg-black";
export const responseGridSystem =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
export const dismissableButtonStyle = `
  px-4 py-2 rounded-md font-bold tracking-wide transition-colors duration-100
  border-2 border-neutral-500 hover:border-neutral-600 active:border-neutral-700
  dark:border-neutral-400 dark:active:border-neutral-200
  text-neutral-700 dark:text-gray-100
  bg-transparent
  hover:bg-white hover:text-black hover:border-white
  focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50
  dark:focus:ring-neutral-400 dark:focus:ring-opacity-60
`;
export const tokenStyle =
  "grid grid-cols-[auto_1fr] items-center gap-2 bg-stone-50 dark:bg-darkContrast p-3 mb-2 rounded";
export const tokenNameStyle =
  "font-bold truncate text-black dark:text-neutral-400";
export const tokenAmountStyle =
  "font-bold truncate text-grey dark:text-neutral-300";
export const inputIconStyle = "text-grey dark:text-neutral-500 cursor-pointer";
export const dialogTitleStyle =
  "text-2xl tracking-wide my-auto font-bold text-black dark:text-neutral-300";
