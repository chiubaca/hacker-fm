// detect safari browser
export default function isSafariBrowser() {
  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}
