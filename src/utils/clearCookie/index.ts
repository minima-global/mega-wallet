export function clearCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export default clearCookie;
