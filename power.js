class Power {
  constructor(gameScreen, obstacle) {
    this.gameScreen = gameScreen;
    this.obstacle = obstacle;
    this.top = this.obstacle.top + 100;
    this.left = this.obstacle.left;
    this.width = 20;
    this.height = 20;
    this.type = this.getRandomObstacleType(); // Determine egg type (black or golden)

    this.element = this.createPowerElement();
    this.gameScreen.appendChild(this.element);
  }

  getRandomObstacleType() {
    const randomNumber = Math.random();
    return randomNumber < 0.7 ? 'black' : 'golden';
  }

  createPowerElement() {
    const power = document.createElement('img');
    power.src = this.type === 'black' ? 'blackegg.png' : 'goldenegg.jpg';
    power.style.position = 'absolute';
    power.style.width = `${this.width}px`;
    power.style.height = `${this.height}px`;
    power.style.left = `${this.left}px`;
    power.style.top = `${this.top}px`;
    return power;
  }

  move() {
    this.top += 3;
    this.element.style.top = `${this.top}px`;

    if (this.top > this.gameScreen.clientHeight) {
      this.element.remove();
    }
  }
}
