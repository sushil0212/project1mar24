class Obstacle {
  constructor(gameScreen, level) {
    this.gameScreen = gameScreen;
    if(level === 2) {
    this.top = 400;
    }
    this.top = 20;
    this.left = this.gameScreen.offsetWidth;
    this.width = 100;
    this.height = 140;

    this.element = this.createObstacleElement();

    this.gameScreen.appendChild(this.element);
    this.startMoving();
  }

  createObstacleElement() {
    const obstacle = document.createElement("img");
    obstacle.src = "images/dragonImg-unscreen.gif";
    obstacle.style.position = "absolute";
    obstacle.style.width = `${this.width}px`;
    obstacle.style.height = `${this.height}px`;
    obstacle.style.top = `${this.top}px`;
    obstacle.style.left = `${this.left}px`;
    return obstacle;
  }

  startMoving() {
    this.moveInterval = setInterval(() => {
      this.move();
    }, 400);
  }

  move() {
    this.left -= 3;
    this.element.style.left = `${this.left}px`;

    if (this.left + this.width < 0) {
      this.resetPosition();
    }
  }

  resetPosition() {
    this.left = this.gameScreen.offsetWidth;
    this.element.style.left = `${this.left}px`;
  }
}

function createContinuousObstacles() {
  function addObstacle() {
    const obstacle = new Obstacle(this.gameScreen);

    const removeInterval = setInterval(() => {
      if (obstacle.left + obstacle.width < 0) {
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
