// Get the leaderboard
let leaderboard = document.getElementById("leaderboard");

// Get the button that opens the board
let btn = document.getElementById("leaderboard-button");

// When the user clicks the button, open the board 
btn.onclick = function() {
    leaderboard.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == leaderboard) {
    leaderboard.style.display = "none";
  }
}