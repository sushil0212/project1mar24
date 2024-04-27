class Level2Dragon {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = 100;
        this.height = 140;
        this.top = this.gameScreen.clientHeight - this.height; // Bottom of the screen
        this.left = Math.random() * (this.gameScreen.offsetWidth - this.width);

        this.element = this.createDragonElement();
        this.gameScreen.appendChild(this.element);

        this.startMoving();
    }

    createDragonElement() {
        const dragon = document.createElement("img");
        dragon.src = "lastdragon.png"; 
        dragon.style.position = "absolute";
        dragon.style.width = `${this.width}px`;
        dragon.style.height = `${this.height}px`;
        dragon.style.top = `${this.top}px`;
        dragon.style.left = `${this.left}px`;
        return dragon;
    }

    startMoving() {
        this.moveInterval = setInterval(() => {
            this.move();
        }, 400);
    }

    move() {
        this.top -= 3; //upwards flying
        this.element.style.top = `${this.top}px`;

        if (this.top + this.height < 0) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.top = this.gameScreen.clientHeight - this.height;
        this.left = Math.random() * (this.gameScreen.offsetWidth - this.width);
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
    }
}
