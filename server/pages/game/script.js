import { getCurrentUrl } from "/static/utils/utils.js";
import { getFrontEndUrl } from "/static/utils/utils.js";
import { getHomeUrl } from "/static/utils/utils.js";
import { getLeaderboardUrl } from "/static/utils/utils.js";
import {getQueryParameters} from "/static/utils/utils.js";
let numberOfGuesses = 0;
let baseUrl = "http://localhost:3000";
var modal = document.getElementById("myModal");

window.onload = async function()
{
    const gameId = getGameId();

    const result = await fetch(generataFullUrl("/games/" + gameId), {method: 'GET'});
    const {status} = await result.json();

    if(status === 'found')
    {
        const serverResponse = await fetch(generataFullUrl("/guess/" + gameId +"/guesses/"));
       
        if(serverResponse["status"] === "fail")
        {
                createElementError("Internal server error!");
        }else {
            
            const data = await serverResponse.json();
            
            for (let element of data["guess"]) {
                    console.log();
                                
                if(element["bullsCount"] == 4)
                {

                    createElementGuess(element["guess"],element["cowsCount"],element["bullsCount"],true);
                    modal.style.display = "block";
                    modal.classList.add('modal-display-properties');        
                    document.getElementById("submit").setAttribute('disabled',"");                    
                }else{
                    createElementGuess(element["guess"],element["cowsCount"],element["bullsCount"],false);
                }
            }
        }
    }else{
        // we play like normal
    }
    
}

document.getElementById("end-game").addEventListener("click",async function(event){
    event.preventDefault();
    const userName = document.getElementById("username").value;
    
    if(!(/^[a-zA-Z0-9]{2,20}$/.test(userName)))
    {
        console.log("Error in validation!");
        //add error display

    }else{
        await saveGame(getGameId(),userName);
    }

});

document.getElementById("view-leadeboard").addEventListener("click", async function(event){
    event.preventDefault();
    loadLeaderboard();
});

document.getElementById("logo").addEventListener("click",async function(event){
    event.preventDefault();
    loadHomePage();
});

document.getElementById("home-page").addEventListener("click",async function(event){
    event.preventDefault();
    loadHomePage();
});


document.getElementById("new-game-navbar").addEventListener("click",async function(event){
    event.preventDefault();
    startNewGame();
});

document.getElementById("new-game-modal").addEventListener("click",async function(event){
    event.preventDefault();
    startNewGame();
})

document.getElementById("submit").addEventListener("click", async function(event){
    event.preventDefault();
    const number = document.getElementById("guessInput").value;
   
    
    numberOfGuesses++;
    if (!/^(?!.*(.).*\1)\d{4}$/.test(number)) 
    {
        console.log("Error in validation!");
        createElementError("Enter number consisting of 4 unique digits!");
    }else{

        let serverResponse = await getData(number,getGameId());
        

        if(serverResponse["status"] == "fail")
        {
            createElementError(serverResponse["message"])
        }else {
            if(serverResponse["bullsCount"] == 4 && serverResponse["hasGuessed"] == true )
            {
                
                await endGame(getGameId());

                createElementGuess(number,serverResponse["cowsCount"],serverResponse["bullsCount"],serverResponse["hasGuessed"])

            }else{
                createElementGuess(number,serverResponse["cowsCount"],serverResponse["bullsCount"],serverResponse["hasGuessed"]);
            }
        }
        
    }
});

function loadLeaderboard()
{
    window.location.href = getLeaderboardUrl();
}

function loadHomePage()
{
    window.location.href = getHomeUrl();
}

async function saveGame(gameId,userName)
{

    
    const result = await fetch(generataFullUrl("/games/" + gameId + "/result"), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "userName": userName }),
    });

    const {status, message} = await result.json();

    if(status === 'success')
    {
        loadLeaderboard();
    }
}

async function endGame(gameId)
{
    const result = await fetch(generataFullUrl("/games/" + gameId + "/end"), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    
    const {status, message} = await result.json();

    if(status === 'success')
    {
        modal.style.display = "block";
        modal.classList.add('modal-display-properties');        
        document.getElementById("submit").setAttribute('disabled',"");

    }
}
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

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
function getGameId()
{
    return getQueryParameters().gameId;
}

async function getData(guess,gameId)
{
    try {
        const request = new Request(generataFullUrl("/guess/create/"+gameId), {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ "guess": guess }),
        });
        
        const response = await fetch(request);
        
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`); 
        }
    
        const json = await response.json();
        
        return json;

      } catch (error) {
        console.error(error.message); // change this to display error in element
      }
}



function createElementError(string)
{
    const newLi = document.createElement('li');
    const errorDisplayDiv = document.createElement('div');
    errorDisplayDiv.className = 'error-display';
    errorDisplayDiv.textContent = string;
    newLi.append(errorDisplayDiv);
    document.querySelector('.guess-list').appendChild(newLi);
    if(numberOfGuesses > 5)
        {
                document.getElementById("guess-list").style.height = String(document.getElementById("guess-list").offsetHeight + 50) + "px"
                document.getElementById("guess-list").style.paddingBottom = '2.5vh';
        }
}

function createElementGuess(guess,bulls,cows,hasGuessed)
{
    const newLi = document.createElement('li');
    if(hasGuessed)  newLi.classList.add('green');

    const guessDisplayDiv = document.createElement('div');
    guessDisplayDiv.className = 'guess-display';
    guessDisplayDiv.textContent = guess; 
    

    const numberOfAnimalsContainerDiv = document.createElement('div');
    numberOfAnimalsContainerDiv.className = 'number-of-animals-container';
    
    const bullsCountDiv = document.createElement('div');
    bullsCountDiv.className = 'bulls-count';
    bullsCountDiv.textContent = bulls; 
    
    const cowsCountDiv = document.createElement('div');
    cowsCountDiv.className = 'cows-count';
    cowsCountDiv.textContent = cows;
    
    numberOfAnimalsContainerDiv.appendChild(bullsCountDiv);
    numberOfAnimalsContainerDiv.appendChild(cowsCountDiv);
    
    newLi.appendChild(guessDisplayDiv);
    newLi.appendChild(numberOfAnimalsContainerDiv);
    
    if(numberOfGuesses > 5)
    {
            document.getElementById("guess-list").style.height = String(document.getElementById("guess-list").offsetHeight + 50) + "px"
            document.getElementById("guess-list").style.paddingBottom = '2.5vh';
    } 
    
    document.querySelector('.guess-list').appendChild(newLi);
}


function generataFullUrl(path)
{
    return baseUrl + path;
}