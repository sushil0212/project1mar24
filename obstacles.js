class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.top = 20;
    this.right = 0;
    this.width = 100;
    this.height = 140;

    this.element = this.createObstacleElement();

    this.gameScreen.appendChild(this.element);
    this.startMoving();
  }

  createObstacleElement() {
    const obstacle = document.createElement("img");
    obstacle.src = "dragonImg-unscreen.gif";
    obstacle.style.position = "absolute";
    obstacle.style.width = `${this.width}px`;
    obstacle.style.height = `${this.height}px`;
    obstacle.style.top = `${this.top}px`;
    obstacle.style.right = `${this.right}px`;
    return obstacle;
  }

  startMoving() {
    this.moveInterval = setInterval(() => {
      this.move();
    }, 400);
  }

  move() {
    this.right += 3;
    this.element.style.right = `${this.right}px`;

    if (this.right > this.gameScreen.clientWidth) {
      this.resetPosition();
    }
  }

  resetPosition() {
    this.right = 0 - this.width;
    this.element.style.right = `${this.right}px`;
  }
}

function createContinuousObstacles() {
  function addObstacle() {
    const obstacle = new Obstacle(this.gameScreen);

    const removeInterval = setInterval(() => {
      if (obstacle.right > gameScreen.clientWidth) {
        obstacle.element.remove();
        clearInterval(obstacle.moveInterval);
        clearInterval(removeInterval);
      }
    }, 100);

    setTimeout(addObstacle, 2000);
  }

  addObstacle();
}

/* const gameScreen = document.getElementById("gameScreen");
createContinuousObstacles(gameScreen); */
