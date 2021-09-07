/**
 * Get the value of a particular cookie
 * @param name The name of the cookie, to retieve
 */
export default function getCookieValue(name: string) {
    var b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

/**
 * Get the value of a particular cookie
 * @param name The name of the cookie, to retieve
 */
export function getSignedCookieValue(name: string) {
  const value = getCookieValue(name) || '';
  return value.replace('s%3', ''); // remove signed cookie signal
}
