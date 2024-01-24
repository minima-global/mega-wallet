// We write a method declaration then we export it,
// We export it from the index.ts in this folder to then which we can import it later
// as a utils method

/**
 *
 * @param cname
 * @param cvalue
 * @param exdays
 */
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default setCookie;
