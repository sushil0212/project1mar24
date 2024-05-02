class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.baseWidth = width; // Store original width
        this.baseHeight = height; // Store original height
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');
        this.element.src = imgSrc;
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        gameScreen.appendChild(this.element);

        this.isFlashing = false;
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;

        // Ensure player stays within game boundaries
        if (this.left < 10) {
            this.left = 10;
        }
        if (this.top < 10) {
            this.top = 10;
        }
        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }
        const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;
        if (this.top > bottomMaxValue) {
            this.top = bottomMaxValue;
        }

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            if (obstacle.type === 'black' && !this.isFlashing) {
                this.flashPlayer();
            }
            return true;
        } else {
            return false;
        }
    }

    flashPlayer() {
        this.isFlashing = true;
        const originalOpacity = parseFloat(getComputedStyle(this.element).opacity);

        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount % 2 === 0) {
                // Reduce opacity to 50% (0.5)
                this.element.style.opacity = '0.6';
            } else {
                // Restore original opacity
                this.element.style.opacity = originalOpacity.toString();
            }

            flashCount++;

            if (flashCount >= 10) { // Flash 10 times
                clearInterval(flashInterval);
                this.isFlashing = false;
            }
        }, 100);
    }

    // increase player size by 50px
    increaseSize() {
        this.width += 50;
        this.height += 50;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }

    //reset player size 
    resetSize() {
        this.width = this.baseWidth;
        this.height = this.baseHeight;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }
}

