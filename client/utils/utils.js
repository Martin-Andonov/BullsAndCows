export function getFrontEndUrl(path){
    const [location] = window.location.pathname.split('client');
    return `${location}/client/${path}`
}