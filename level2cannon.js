class Level2Cannon {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = 100;
        this.height = 100;
        this.top = this.gameScreen.clientHeight - this.height; // Start from the bottom of the screen
        this.left = this.gameScreen.offsetWidth; // Start from the rightmost edge

        this.element = this.createCannonElement();
        this.gameScreen.appendChild(this.element);

        this.startMoving();
    }

    createCannonElement() {
        const cannon = document.createElement("img");
        cannon.src = "images/cannonimage.png"; // Adjusted image source path
        cannon.style.position = "absolute";
        cannon.style.width = `${this.width}px`;
        cannon.style.height = `${this.height}px`;
        cannon.style.top = `${this.top}px`;
        cannon.style.left = `${this.left}px`;
        return cannon;
    }
    
    startMoving() {
        this.moveInterval = setInterval(() => {
            this.move();
        }, 100); // Adjust the interval for smoother movement
    }

    move() {
        this.left -= 5; // Move leftwards
        this.element.style.left = `${this.left}px`;

        if (this.left + this.width < 0) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.top = this.gameScreen.clientHeight - this.height;
        this.left = this.gameScreen.offsetWidth; // Start from the rightmost edge
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
    }
}

