import Cookies from 'js-cookie'




export async function removeAuthCookie() {
  Cookies.remove('authToken');
}

export async function removeStoreCookie() {
  Cookies.remove('authToken');
}