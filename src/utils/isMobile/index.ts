const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

export default isMobileDevice;
