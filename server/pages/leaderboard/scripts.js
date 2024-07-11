import { getHomeUrl } from "/static/utils/utils.js";
import { getLeaderboardUrl } from "/static/utils/utils.js";
import { getFrontEndUrl } from "/static/utils/utils.js";
let baseUrl = "http://localhost:3000";

window.onload = async function()
{
  const data = await getLeaderboardData();
  //call displayData
}

async function getLeaderboardData(){
  const result = await fetch(generataFullUrl("/games/gameRanking"), {method: 'GET'});
    
    const {status, games} = await result.json();

    if(status === 'success')
    {
        console.log(games);
    }
}

//temp
document.getElementById('myButton').addEventListener('click', function() {
  document.getElementById('message').textContent = 'Hello, World!';
});
//-----------

document.getElementById("new-game-navbar").addEventListener("click",async function(event){
event.preventDefault();
startNewGame();
});

document.getElementById("view-leadeboard").addEventListener("click", async function(event){
  event.preventDefault();
  loadLeaderboard();
});

document.getElementById("logo").addEventListener("click",async function(event){
  event.preventDefault();
  loadHomePage();
});

async function startNewGame()
{
    const result = await fetch(generataFullUrl("/games/start"), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    
    const {status, gameId} = await result.json();

    if(status === 'success')
    {
        window.location.href = getFrontEndUrl(`game?gameId=${gameId}`);
    }
}

function displayData()
{
  //will display the leaderboard 
  //omitted untill frontend is ready
}

function loadLeaderboard()
{
    window.location.href = getLeaderboardUrl();
}

function loadHomePage()
{
    window.location.href = getHomeUrl();
}

function generataFullUrl(path)
{
    return baseUrl + path;
}