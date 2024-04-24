window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game = null;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (possibleKeys.includes(key)) {
      // Prevent default behavior (e.g., scrolling) for arrow keys
      event.preventDefault();

      // Reset player's movement direction
      game.player.directionX = 0;
      game.player.directionY = 0;

      // Update player's movement direction based on pressed key
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  function handleKeyUp(event) {
    // Reset player's movement direction when key is released
    const key = event.key;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) {
      game.player.directionX = 0;
      game.player.directionY = 0;
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
};
