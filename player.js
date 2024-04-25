class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = 0;
        this.top = 0;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');

        this.addPlayer(imgSrc);


    }

    addPlayer(imgSrc) {
        this.element.src = imgSrc;
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.gameScreen.appendChild(this.element);

    }

    move() {
        //update car position
        this.left += this.directionX;
        this.top += this.directionY;

        if(this.left < 10) {
            this.left = 10;

        }

        if(this.top < 10) {
            this.top = 10;

        }

        if(this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }

        //handles bottom position
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
        const obstaleRect = obstacle.element.getBoundingClientRect();


        if(playerRect.left < obstaleRect.right && 
            playerRect.right > obstaleRect.left && 
            playerRect.top < obstaleRect.bottom && 
            playerRect.bottom > obstaleRect.top
        ) {

            return true; 
        }

          else {
            return false;

        }
    }
    }

