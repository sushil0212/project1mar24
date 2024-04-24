class Game {
  // code to be added
  constructor() {
      this.startScreen = document.getElementById("game-intro")
      this.gameScreen = document.getElementById("game-screen")
      this.gameEndScreen = document.getElementById("game-end")
      this.player = new Player(this.gameScreen, 200, 500, 100, 150, "flyingpenguine.gif");
      this.height = 600
      this.width = 500
      this.obstacles = []
      this.score = 0
      this.lives = 3
      this.gameIsOver = false
      this.gameIntervalID = null
      this.gameLoopFrequency = Math.floor(1000/60)

  }
  start() {
      this.gameScreen.style.width = `${this.width}px`
      this.gameScreen.style.height = `${this.height}px`
     // removing the start screen from the page
      this.startScreen.style.display = "none"
      // show the gameScreen
      this.gameScreen.style.display = "block"
      //start the loop
      this.gameIntervalID = setInterval(() => {
          this.gameLoop()
      }, this.gameLoopFrequency)
  }
  gameLoop() {
      console.log("gameLoop");
      this.update()
      if(this.gameIsOver) {
          clearInterval(this.gameIntervalID)
      }


  }
  update() {
      this.player.move()
      for(let i = 0; i < this.obstacles.length; i++) {
          const obstacle = this.obstacles[i]

  //moving the obstacles
      obstacle.move()
      //check for collision
      if(this.player.didCollide(obstacle)) {
          //remove the html element
          obstacle.element.remove()
          //remove from the array
          this.obstacles.splice(i, 1)
          this.lives--
          //update the counter so we account for the removed obstacle
          i--
      } else if(obstacle.top > this.height) {
          obstacle.element.remove()
          //remove from the array
          this.obstacles.splice(i, 1)

          this.score++
          //update the counter so we account for the removed obstacle
          i--


      } 
      if(this.lives === 0) {
          this.endGame()

      }

  //..
      }
      console.log(this.lives);
      console.log(this.score);

  if(Math.random() > 0.98 && this.obstacles.length < 2) { //checking the time frame of 60 persecond
  this.obstacles.push(new Obstacle(this.gameScreen))

}
}
endGame() {
  this.player.element.remove() 
  this.obstacles.forEach(obstacle => obstacle.element.remove())
  this.obstacles = []

  //stop the engine
  this.gameIsOver = true
  //hide the gameScreen

  this.gameScreen.style.display = "none"
  //show the end game screen
  this.gameEndScreen.style.display = "block"

  }
}