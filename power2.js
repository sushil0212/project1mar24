class Power2 {
    constructor(gameScreen, cannon) {
        this.gameScreen = gameScreen;
        this.top = this.gameScreen.clientHeight - 10; // Start from bottom of the screen
        this.left = cannon.left - 40; // Random horizontal position
        this.width = 20;
        this.height = 20;
        this.type = this.getRandomEggType(); // Determine egg type (black or golden)

        this.element = this.createPowerElement();
        this.gameScreen.appendChild(this.element);

        this.move();
    }

    getRandomEggType() {
        const randomNumber = Math.random();
        return randomNumber < 0.7 ? 'black' : 'golden';
    }

    createPowerElement() {
        const power = document.createElement('img');
        power.src = this.type === 'black' ? 'images/blackegg.png' : 'images/goldenEgg.png';
        power.style.position = 'absolute';
        power.style.width = `${this.width}px`;
        power.style.height = `${this.height}px`;
        power.style.left = `${this.left}px`;
        power.style.top = `${this.top}px`;
        return power;
    }

    move() {
        this.moveInterval = setInterval(() => {
            this.top -= 3; // Move egg upwards
            this.element.style.top = `${this.top}px`;

            if (this.top < 0) {
                this.element.remove();
                clearInterval(this.moveInterval);
            }
        }, 50); // Adjust speed of egg movement
    }
}
