window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });
  const game = new Game()

  function startGame() {
    console.log("start game");


    game.start();

  }

  window.addEventListener('keydown', event => {
    event.preventDefault()

    switch(event.key) {
      case 'ArrowUp':
        game.player.directionY = -2;
        break;
        case 'ArrowDown':
          game.player.directionY = 2;
          break;
          case 'ArrowLeft':
            game.player.directionX = -3;
            break;
            case 'ArrowRight':
              game.player.directionX = 2;
              break;

    }

  });

  restartButton.addEventListener('click', () => {
    //reload the browser
    location.reload();
  });
};

