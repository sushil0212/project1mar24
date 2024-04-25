class Power {
  constructor(gameScreen, obstacle) {
    this.gameScreen = gameScreen;
    this.obstacle = obstacle;
    this.top = this.obstacle.top + 5;
    this.left = this.obstacle.left + 5;
    this.width = 20;
    this.height = 20;
    this.type = this.getRandomObstacleType(); // Determine obstacle type (black or golden)

    this.element = this.createPowerElement();
    this.element.style.position = 'absolute'
    this.element.width = this.width;
    this.element.height = this.height;
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`


    this.gameScreen.appendChild(this.element);
    //this.startMoving();
  }

  getRandomObstacleType() {
    // Randomly choose between 'black' (70% chance) and 'golden' (40% chance)
    const randomNumber = Math.random();
    return randomNumber < 0.7 ? 'black' : 'golden';
  }

  createPowerElement() {
    const power = document.createElement("img");
    power.src = this.type === 'black' ? "blackegg.png" : "goldenegg.jpg";
    return power;
  }

  //move method

  move() {
   
    this.top += 3;
    this.element.style.top = `${this.top}px`;

    if (this.top > this.gameScreen.clientHeight) {
      this.resetPosition();
    }
  }

  startMoving() {
    this.moveInterval = setInterval(() => {
      this.move();
    }, 100);
  }


/*    resetPosition() {
    this.top = 0 - this.height;
    this.type = this.getRandomObstacleType(); // Reset obstacle type
    this.element.src = this.type === 'black' ? "blackegg.png" : "goldenegg.jpg";
    this.element.style.top = `${this.top}px`;
  } 
 */
  checkCollision() {
    const playerRect = document.getElementById('player').getBoundingClientRect();
    const obstacleRect = this.element.getBoundingClientRect();

    if (
      obstacleRect.right >= playerRect.left &&
      obstacleRect.left <= playerRect.right &&
      obstacleRect.bottom >= playerRect.top &&
      obstacleRect.top <= playerRect.bottom
    ) {
      // Collision occurred
      if (this.type === 'black') {
        // Decrease lives for black egg
        decreaseLives();
      } else if (this.type === 'golden') {
        // Increase score and lives for golden egg
        increaseScore(5);
        increaseLives();
      }
      
      // Reset the obstacle position after collision
      this.resetPosition();
    }
  }
}

