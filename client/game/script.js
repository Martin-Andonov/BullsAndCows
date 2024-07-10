
let numberOfGuesses = 0;
let baseUrl = "http://localhost:3000";
var modal = document.getElementById("myModal");


document.getElementById("submit").addEventListener("click", async function(event){
    event.preventDefault();
    const number = document.getElementById("guessInput").value;
   

    if (!/^(?!.*(.).*\1)\d{4}$/.test(number)) 
    {
        console.log("Error in validation!");
        createElementError("Enter number consisting of 4 unique digits!");
    }else{
        numberOfGuesses++;

        let serverResponse = await getData(number);
        console.log(serverResponse); 

        if(serverResponse["status"] == "fail")
        {
            createElementError(serverResponse["message"])
        }else {
            if(serverResponse["bullsCount"] == 4 || serverResponse["hasGuessed"] == true )
            {
                console.log("win");
                //create modals saveGame
                createElementGuess(number,serverResponse["cowsCount"],serverResponse["bullsCount"],serverResponse["hasGuessed"])
                modal.style.display = "block";
                modal.classList.add('modal-display-properties');
                
                document.getElementById("submit").setAttribute('disabled',"");

            }else{
                createElementGuess(number,serverResponse["cowsCount"],serverResponse["bullsCount"],serverResponse["hasGuessed"]);
            }
        }
        
    }
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

async function getData(guess)
{
    try {
        const request = new Request(generataFullUrl("/guess/create/1"), {
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
    
    document.querySelector('.guess-list').appendChild(newLi);
}


function generataFullUrl(path)
{
    return baseUrl + path;
}