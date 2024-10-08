const BackIcon = ({ fill, size =22 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-wallet fill-teal-600"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke={fill}
    fill={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 12l14 0" />
    <path d="M5 12l6 6" />
    <path d="M5 12l6 -6" />
  </svg>
);

export default BackIcon;