class Game {
    constructor() {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
       // this.gameLevelScreen = document.getElementById('game-level');
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, 'flyingpenguine.gif');
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.eggs = [];
        this.dragons = [];
        this.score = 0;
        this.lives = 10;
        this.isGameOver = false;
        this.level = 1;
        this.isPaused = false

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

        // level 2 should be activated (check)
        if(this.score < 5) this.level = 1
        if (this.score >= 5) {
            this.level = 2
           //this.nextLevel()
      
        }
        //if level 2, create dragons
        if (Math.random() > 0.98 && this.dragons.length < 1 && this.level === 2) {
            this.createDragon()
        }    

        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            const newObstacle = new Obstacle(this.gameScreen, this.level);
            this.obstacles.push(newObstacle);
        }

        this.obstacles.forEach((obstacle, index) => {
            obstacle.move();

            if (Math.random() > 0.98 && this.eggs.length < 1) {
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

        // Update egg movement and collision
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

        // Update Level 2 dragon movement and collision
        this.dragons.forEach((dragon, index) => {
            dragon.move();

            if (this.player.didCollide(dragon)) {
                // Decrease both lives and score
                this.lives--;
                this.score -= 5;
                this.updateStats();
                dragon.element.remove();
                this.dragons.splice(index, 1);
            }
        });

        // Check game over condition
        if (this.lives === 0) {
            this.endGame();
        }
    }

    createDragon() {
        // Create Level 2 dragon
        const level2Dragon = new Level2Dragon(this.gameScreen);
        this.dragons.push(level2Dragon);
    }

    endGame() {
        // Remove all elements from the screen
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.eggs.forEach(egg => egg.element.remove());
        this.dragons.forEach(dragon => dragon.element.remove());

        this.isGameOver = true;

        // Hide the game screen and show the end screen
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
    }

    nextLevel(){
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.eggs.forEach(egg => egg.element.remove());
        this.dragons.forEach(dragon => dragon.element.remove());

        //show the button
        // call start game
        // this.level = 2
    
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

