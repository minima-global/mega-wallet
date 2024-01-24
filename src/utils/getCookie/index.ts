// We write a method declaration then we export it,
// We export it from the index.ts in this folder to then which we can import it later
// as a utils method

/**
 *
 * @param _name
 * @returns a string representation of a cookie
 */

export function getCookie(_name: string): string | undefined {
  const name = _name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }

    return "";
  }
}

export default getCookie;
