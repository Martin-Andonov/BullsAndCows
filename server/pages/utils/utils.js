export function getFrontEndUrl(path){
    //const [location] = window.location.pathname.split('client');
    return `${window.location.origin}/static/${path}`
}

export function getCurrentUrl()
{
    return window.location;
}

export function getHomeUrl()
{
    return window.location.origin + "/static/home-page/index.html";
}

export function getLeaderboardUrl()
{
    return window.location.origin + "/static/leaderboard/index.html"
}