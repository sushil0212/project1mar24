window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  const game = new Game();

  function startGame() {
    console.log("start game");

    // Hide the game intro screen
    const gameIntro = document.getElementById('game-intro');
    gameIntro.style.display = 'none';

    // Show the game container (stats) when the game starts
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'flex'; // Show as flex to maintain layout

    game.start();
  }

  window.addEventListener('keydown', event => {
    event.preventDefault();

    switch(event.key) {
      case 'ArrowUp':
        game.player.directionY = -3;
        break;
      case 'ArrowDown':
        game.player.directionY = 3;
        break;
      case 'ArrowLeft':
        game.player.directionX = -4;
        break;
      case 'ArrowRight':
        game.player.directionX = 4;
        break;
    }
  });

  restartButton.addEventListener('click', () => {
    // Reload the browser
    location.reload();
  });
};
