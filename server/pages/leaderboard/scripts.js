document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('message').textContent = 'Hello, World!';
  });

document.getElementById("new-game-navbar").addEventListener("click",async function(event){
  event.preventDefault();
  startNewGame();
});

  