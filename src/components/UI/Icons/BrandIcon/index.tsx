const BrandIcon = ({ fill, size = 20, extraClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={extraClass}
    viewBox="0 -960 960 960"
    strokeWidth="1.5"
    fill="#FFF"
    stroke={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M11.2217 10.7406L20.611 14.5327L26.3605 12.2096L28.3704 3.32277L20.611 6.45729L5.86085 0.5L0.5 24.2025L8.94839 20.7904L11.2217 10.7406Z"
      fill="#FFFFFF"
    />
    <path
      d="M26.3605 12.2095L24.0872 22.2593L14.6979 18.4671L8.94844 20.7902L6.93848 29.677L14.6979 26.5425L29.4481 32.4998L34.8089 8.79736L26.3605 12.2095Z"
      fill="#FFFFFF"
    />
  </svg>
);

export default BrandIcon;
