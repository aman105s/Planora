export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function handleGlobalLogoClick(navigate) {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const parsed = parseJwt(token);
      if (parsed?.role === 'admin' || parsed?.role === 'vendor') {
        navigate('/portal/vendor');
        return;
      } else {
        navigate('/portal/couple');
        return;
      }
    } catch(e){}
  }
  navigate('/');
}
