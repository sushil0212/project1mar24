class Game {
    constructor() {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = new Player(this.gameScreen, 300, 500, 100, 150, 'images/flyingpenguine.gif');
        this.height = 730;
        this.width = 700;
        this.obstacles = [];
        this.eggs = [];
        this.cannonEggs = []
        this.cannons = [];
        this.score = 0;
        this.lives = 10;
        this.isGameOver = false;
        this.level = 1;
        this.isPaused = false;
        this.levelNotification = document.createElement('div');
        this.levelNotification.id = 'level-notification';
        this.levelNotification.style.position = 'absolute';
        this.levelNotification.style.top = '50%';
        this.levelNotification.style.left = '50%';
        this.levelNotification.style.transform = 'translate(-50%, -50%)';
        this.levelNotification.style.padding = '20px';
        this.levelNotification.style.backgroundColor = 'green';
        this.levelNotification.style.color = 'white';
        this.levelNotification.style.fontSize = '24px';
        this.levelNotification.style.display = 'none';
        this.gameScreen.appendChild(this.levelNotification);

        this.gameLoop = this.gameLoop.bind(this);
    }

    start() {
        // Setting the game screen size
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
    

        // Hiding the start screen
        this.startScreen.style.display = 'none';
        // Showing the game screen
        this.gameScreen.style.display = 'block';

        this.gameLoop();
    }

    gameLoop() {
        if (this.isGameOver) {
            return;
        }

        this.updateStats();
        this.update();

        window.requestAnimationFrame(this.gameLoop);
    }

    update() {
        this.player.move();

            // Check for player size change based on score
            if (this.score >= 10 && this.player.width === this.player.baseWidth) {
                // Increase player size by 50px
                this.player.increaseSize();
            } else if (this.score < 10 && this.player.width > this.player.baseWidth) {
                // Reset player size to original dimensions
                this.player.resetSize();
            }

        // Check for level change to level 2
        if (this.score >= 5) {
            if (this.level !== 2) {
                this.level = 2;
                this.showLevelNotification('Level 2', 'green', 'white');
            }
        } else {
            if (this.level !== 1) {
                this.level = 1;
                this.cannons.forEach(cannon => cannon.element.remove());
                this.cannons = []
            }
        }

        // Create cannons if level is 2
        if (this.level === 2 && Math.random() > 0.98 && this.cannons.length < 1) {
                // Create Level 2 cannon
                const level2Cannon = new Level2Cannon(this.gameScreen, this.level);
                this.cannons.push(level2Cannon);
            }
        

        // Create obstacles
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            const newObstacle = new Obstacle(this.gameScreen, this.level);
            this.obstacles.push(newObstacle);
        }

        // Handle obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.move();

            if (Math.random() > 0.99 && this.eggs.length < 2 && obstacle.left > 20 && obstacle.left + obstacle.width < this.width - 20) {
                this.eggs.push(new Power(this.gameScreen, obstacle));
            }

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(index, 1);
                this.lives--;
                this.updateStats();
            } else if (obstacle.top > this.height) {
                this.score++;
                obstacle.element.remove();
                this.obstacles.splice(index, 1);
            }
        });

        // Handle eggs
        this.eggs.forEach((egg, index) => {
            egg.move();

            if (this.player.didCollide(egg)) {
                this.checkEgg(egg);
                egg.element.remove();
                this.eggs.splice(index, 1);
                this.score++;
                this.updateStats();
            } else if (egg.top > this.height) {
                egg.element.remove();
                this.eggs.splice(index, 1);
            }
        });

        this.cannonEggs.forEach((egg, index) => {
            egg.move();

            if (this.player.didCollide(egg)) {
                this.checkEgg(egg);
                egg.element.remove();
                this.cannonEggs.splice(index, 1);
                this.score++;
                this.updateStats();
            } else if (egg.top < 0) {
                egg.element.remove();
                this.cannonEggs.splice(index, 1);
            }
        });

        // Handle cannons for level 2
  
            this.cannons.forEach((cannon, index) => {
                cannon.move();

                if (Math.random() > 0.99 && this.cannonEggs.length < 2 && cannon.left > 20 && cannon.left + cannon.width < this.width - 20) {
                    this.cannonEggs.push(new Power2(this.gameScreen, cannon));
                }
    

                if (this.player.didCollide(cannon)) {
                    this.lives--;
                    this.score -= 5;
                    this.updateStats();
                    cannon.element.remove();
                    this.cannons.splice(index, 1);
                }
            });
        

        // Check game over condition
        if (this.lives === 0 || this.score <= -25) {
            this.endGame();
        }
    }

    showLevelNotification(message, bgColor, textColor) {
        this.levelNotification.innerText = message;
        this.levelNotification.style.backgroundColor = bgColor;
        this.levelNotification.style.color = textColor;
        this.levelNotification.style.display = 'block';

        // Automatically hide the notification after 1 second
        setTimeout(() => {
            this.levelNotification.style.display = 'none';
        }, 1000);
    }

   

    endGame() {
        // Remove all elements from the screen
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.eggs.forEach(egg => egg.element.remove());
        this.cannons.forEach(cannon => cannon.element.remove());

        this.isGameOver = true;

        // Hide the game screen and show the end screen
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
    }

    checkEgg(egg) {
        if (egg.type === 'black') {
            this.score -= 5;
            this.lives--;
        } else if (egg.type === 'golden') {
            this.score += 5;
            this.lives++;
        }
    }

    updateStats() {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        scoreElement.innerText = this.score;
        livesElement.innerText = this.lives;
    }
}