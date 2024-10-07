type BackdropProps = {
  onClick: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed z-30 top-0 left-0 bg-white dark:bg-black opacity-80 w-screen lg:h-screen"
    />
  );
};

export default Backdrop;
