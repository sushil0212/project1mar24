class Game {
    // code to be added
    constructor() {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, 'flyingpenguine.gif');
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.eggs = []; 
        this.score = 0;
        this.lives = 10;
        this.isGameOver = false;
        
    }

    start() {
        // setting the game screen size
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        //hiding the start screen
        this.startScreen.style.display = 'none';
        //showing
        this.gameScreen.style.display = 'block';
        
        this.gameLoop();

    }

    gameLoop() {
        //console.log('inside the game loop');
        // interrupt the game loop if this variable was changed to true
        if(this.isGameOver) {
            return;
        }


        this.update();
        this.updateStats()
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        //console.log('inside the update');
        this.player.move();

        if(Math.random() > 0.98 && this.obstacles.length < 1) {
            const newObstacle = new Obstacle(this.gameScreen)
            this.obstacles.push(newObstacle);

        }

        this.obstacles.forEach((obstacle, index) => {
            obstacle.move();

            if(Math.random() > 0.98 && this.eggs.length < 1) {
                this.eggs.push(new Power(this.gameScreen, obstacle ))
    
            }

            if(this.player.didCollide(obstacle)) {
                obstacle.element.remove()
                // remove obstacle from obstacles array

                this.obstacles.splice(index, 1)

                // decrease the player opacity

                //reduce the lives by 1

                this.lives--;
            } else if(obstacle.top > this.height) {
                // increase the score by one
                this.score++;
                //remove the obstacles from the DOM
                obstacle.element.remove();
                //remove the obstacles from the array
                this.obstacles.splice(index, 1);
            }
        });

        this.eggs.forEach((egg, index) => {
            egg.move();

            if(this.player.didCollide(egg)) {
                egg.element.remove()
        
                this.eggs.splice(index, 1)

 //check the egg type and do the logic for the collision
                this.score++;
            } else if(egg.top > this.height) {
                // increase the score by one
                this.lives--;
                //remove the obstacles from the DOM
                egg.element.remove();
                //remove the obstacles from the array
                this.eggs.splice(index, 1);
            }
        });

        if(this.lives === 0) {
            this.endGame();
        }
    }
    endGame() {
        //remove all elements from the screen
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());

        this.isGameOver = true;

        //hide the game screen and show the end screen
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
    }

    updateStats() {
        const score = document.getElementById('score');
        score.innerText = this.score;
        const lives = document.getElementById('lives');
        lives.innerText = this.lives;
    }


} 
