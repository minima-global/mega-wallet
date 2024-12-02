import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import SettingsHelp from "../../components/Settings/Help";
import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import SettingsDeleteAccount from "../../components/Settings/DeleteAccount";

const Settings = () => {
    const { setIsDarkMode, isDarkMode } = useContext(appContext);
    const navigate = useNavigate();
    const [displayHelp, setDisplayHelp] = useState(false);
    const [displayDeleteAccount, setDisplayDeleteAccount] = useState(false);

    const goToHome = () => {
        navigate("/dashboard");
    };

    const toggleDarkMode = () => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }

        localStorage.setItem(
            "darkMode",
            (!!document.body.classList.contains("dark")).toString(),
        );
        setIsDarkMode(document.body.classList.contains("dark"));
    };

    return (
        <div className="mt-0 pro-max:mt-[0px] lg:mt-[28px] xl:max-w-[600px] w-full p-4 px-5 lg:px-4 rounded-lg mx-auto">
            <SettingsHelp display={displayHelp} dismiss={() => setDisplayHelp(false)} />
            <SettingsDeleteAccount display={displayDeleteAccount} dismiss={() => setDisplayDeleteAccount(false)} />
            <div className="container mx-auto">
                <section className="mt-1 lg:mt-0 mb-8">
                    <div className="container mx-auto">
                        <div
                            className="flex items-center gap-4 cursor-pointer"
                            onClick={goToHome}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-black dark:fill-white"
                            >
                                <path d="M3.373 8.75L9.06925 14.4462L8 15.5L0.5 8L8 0.5L9.06925 1.55375L3.373 7.25H15.5V8.75H3.373Z"></path>
                            </svg>
                            Home
                        </div>
                    </div>
                </section>
                <h1 className="pt-0.5 text-2xl lg:text-3xl mb-6 text-black dark:text-white">
                    Settings
                </h1>
                <div className="flex flex-col gap-3">
                    <div onClick={() => setDisplayHelp(true)} className="bg-grey20 hover:bg-grey40 dark:bg-darkContrast dark:hover:bg-mediumDarkContrast transition-colors cursor-pointer w-full px-5 py-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-[22px] min-w-[22px]">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-lightOrange"
                                >
                                    <path
                                        d="M9.989 15.6152C10.2745 15.6152 10.5157 15.5168 10.7125 15.3198C10.9093 15.1226 11.0078 14.8812 11.0078 14.5955C11.0078 14.31 10.9092 14.0688 10.712 13.872C10.5148 13.6753 10.2735 13.577 9.988 13.577C9.7025 13.577 9.46133 13.6756 9.2645 13.8728C9.06767 14.0699 8.96925 14.3113 8.96925 14.5968C8.96925 14.8822 9.06783 15.1234 9.265 15.3203C9.46217 15.5169 9.7035 15.6152 9.989 15.6152ZM9.28075 12.0345H10.6885C10.7013 11.5423 10.7734 11.1491 10.9047 10.8548C11.0363 10.5606 11.3552 10.1706 11.8615 9.68475C12.3013 9.24492 12.6382 8.83875 12.872 8.46625C13.106 8.09392 13.223 7.65417 13.223 7.147C13.223 6.28617 12.9137 5.61375 12.2952 5.12975C11.6766 4.64592 10.9448 4.404 10.1 4.404C9.26533 4.404 8.57467 4.62675 8.028 5.07225C7.48117 5.51775 7.09108 6.04242 6.85775 6.64625L8.14225 7.1615C8.26408 6.8295 8.47242 6.50608 8.76725 6.19125C9.06208 5.87658 9.49992 5.71925 10.0808 5.71925C10.6718 5.71925 11.1086 5.88108 11.3913 6.20475C11.6741 6.52858 11.8155 6.88467 11.8155 7.273C11.8155 7.61283 11.7187 7.92375 11.525 8.20575C11.3315 8.48775 11.0848 8.76017 10.7848 9.023C10.1283 9.61533 9.7135 10.0878 9.5405 10.4405C9.36733 10.793 9.28075 11.3243 9.28075 12.0345ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            Help
                        </div>
                    </div>
                    <div onClick={toggleDarkMode} className="bg-grey20 hover:bg-grey40 dark:bg-darkContrast dark:hover:bg-mediumDarkContrast transition-colors cursor-pointer w-full px-5 py-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-[22px] min-w-[22px]">
                                {isDarkMode && (
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-lightOrange"
                                    >
                                        <path
                                            d="M11 14C11.8333 14 12.5417 13.7083 13.125 13.125C13.7083 12.5417 14 11.8333 14 11C14 10.1667 13.7083 9.45833 13.125 8.875C12.5417 8.29167 11.8333 8 11 8C10.1667 8 9.45833 8.29167 8.875 8.875C8.29167 9.45833 8 10.1667 8 11C8 11.8333 8.29167 12.5417 8.875 13.125C9.45833 13.7083 10.1667 14 11 14ZM11 15.5C9.75133 15.5 8.68917 15.0622 7.8135 14.1865C6.93783 13.3108 6.5 12.2487 6.5 11C6.5 9.75133 6.93783 8.68917 7.8135 7.8135C8.68917 6.93783 9.75133 6.5 11 6.5C12.2487 6.5 13.3108 6.93783 14.1865 7.8135C15.0622 8.68917 15.5 9.75133 15.5 11C15.5 12.2487 15.0622 13.3108 14.1865 14.1865C13.3108 15.0622 12.2487 15.5 11 15.5ZM4 11.75H0.25V10.25H4V11.75ZM21.75 11.75H18V10.25H21.75V11.75ZM10.25 4V0.25H11.75V4H10.25ZM10.25 21.75V18H11.75V21.75H10.25ZM5.573 6.577L3.23075 4.3155L4.2905 3.20575L6.54625 5.523L5.573 6.577ZM17.7095 18.7943L15.4385 16.4615L16.427 15.423L18.7693 17.6845L17.7095 18.7943ZM15.423 5.573L17.6845 3.23075L18.7943 4.2905L16.477 6.54625L15.423 5.573ZM3.20575 17.7095L5.5385 15.4385L6.55775 16.427L4.30575 18.7788L3.20575 17.7095Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                                {!isDarkMode && (
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lightOrange">
                                        <path d="M9.02905 17.5C6.66805 17.5 4.66113 16.6736 3.0083 15.0207C1.35563 13.3681 0.529297 11.3611 0.529297 8.99998C0.529297 6.73714 1.29688 4.79647 2.83205 3.17797C4.36721 1.55931 6.24696 0.68264 8.4713 0.547974C8.61496 0.547974 8.75605 0.55314 8.89455 0.563474C9.03288 0.573807 9.16871 0.589224 9.30205 0.609724C8.79188 1.08656 8.38555 1.66281 8.08305 2.33847C7.78038 3.01414 7.62905 3.73464 7.62905 4.49997C7.62905 6.13881 8.20271 7.53189 9.35005 8.67922C10.4972 9.82639 11.8902 10.4 13.529 10.4C14.3047 10.4 15.0278 10.2487 15.6983 9.94623C16.3688 9.64356 16.9393 9.23714 17.4098 8.72697C17.4303 8.86031 17.4457 8.99623 17.456 9.13473C17.4662 9.27306 17.4713 9.41406 17.4713 9.55772C17.3431 11.7821 16.4698 13.6618 14.8513 15.197C13.2326 16.7323 11.2919 17.5 9.02905 17.5ZM9.02905 16C10.4957 16 11.8124 15.5958 12.979 14.7875C14.1457 13.9791 14.9957 12.925 15.529 11.625C15.1957 11.7083 14.8624 11.775 14.529 11.825C14.1957 11.875 13.8624 11.9 13.529 11.9C11.479 11.9 9.73321 11.1791 8.29155 9.73747C6.84988 8.29581 6.12905 6.54997 6.12905 4.49997C6.12905 4.16664 6.15405 3.83331 6.20405 3.49997C6.25405 3.16664 6.32071 2.83331 6.40405 2.49997C5.10405 3.03331 4.04988 3.88331 3.24155 5.04997C2.43321 6.21664 2.02905 7.53331 2.02905 8.99998C2.02905 10.9333 2.71238 12.5833 4.07905 13.95C5.44571 15.3166 7.09571 16 9.02905 16Z" fill="currentColor">
                                        </path>
                                    </svg>
                                )}
                            </div>
                            {isDarkMode ? "Set light mode" : "Set dark mode"}
                        </div>
                    </div>
                    <div onClick={() => setDisplayDeleteAccount(true)} className="bg-grey20 hover:bg-grey40 dark:bg-darkContrast dark:hover:bg-mediumDarkContrast transition-colors cursor-pointer w-full px-5 py-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-[22px] min-w-[22px]">
                                <svg
                                    width="16"
                                    height="18"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-lightOrange"
                                >
                                    <path
                                        d="M3.30775 17.4997C2.80908 17.4997 2.38308 17.3232 2.02975 16.97C1.67658 16.6167 1.5 16.1907 1.5 15.692V2.99973H0.5V1.49973H5V0.615234H11V1.49973H15.5V2.99973H14.5V15.692C14.5 16.1972 14.325 16.6247 13.975 16.9747C13.625 17.3247 13.1974 17.4997 12.6923 17.4997H3.30775ZM13 2.99973H3V15.692C3 15.7818 3.02883 15.8556 3.0865 15.9132C3.14417 15.9709 3.21792 15.9997 3.30775 15.9997H12.6923C12.7692 15.9997 12.8398 15.9677 12.9038 15.9035C12.9679 15.8395 13 15.769 13 15.692V2.99973ZM5.404 13.9997H6.90375V4.99973H5.404V13.9997ZM9.09625 13.9997H10.596V4.99973H9.09625V13.9997Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            Delete account
                        </div>
                        <div className="border-b border-b-grey80 dark:border-b-lightDarkContrast w-full my-3" />
                        <div className="text-sm">
                            This will remove all wallet related data from your device. Your
                            accounts exist on the Minima blockchain and are not related to the
                            Public Wallet. You can always recover your accounts using your
                            Secret Key.
                        </div>
                    </div>
                </div>
            </div>
            <Logout />
        </div>
    );
};

export default Settings;
