export function getFrontEndUrl(path){
    //const [location] = window.location.pathname.split('client');
    return `${window.location.origin}/static/${path}`
}