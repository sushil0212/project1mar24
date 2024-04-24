class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
      this.gameScreen = gameScreen;
      this.left = 0;
      this.top = 0;
      this.width = width;
      this.height = height;
      this.directionX = 0;
      this.directionY = 0;

      this.element = document.createElement('img')
      this.element.src = imgSrc

      //position of the player
      this.element.style.position = "absolute"

      //size of the player
      this.element.style.width = `${this.width}px`
      this.element.style.height = `${this.height}px`

      //position the player
      this.element.style.left = `${this.left}px`
      this.element.style.top = `${this.top}px`

      this.gameScreen.appendChild(this.element)

      


  }

  move() {
      // this.directionX = 0 || -1 || 1
      // this.left = 50 += -1 -> 49
      this.left += this.directionX
      this.top += this.directionY


      //borderCollision
      if(this.left < 10) {
          this.left = 10
      }
      if(this.top < 10) {
          this.top = 10
      }

      //right
      if(this.left > this.gameScreen.offsetWidth - this.width - 10) {
          this.left > this.gameScreen.offsetWidth - this.width - 10

      }

      //bottom
      if(this.top > this.gameScreen.offsetHeight - this.height - 10) {
          this.top > this.gameScreen.offsetHeight - this.height - 10
      }



      this.updatePositon()

  }

  updatePositon() {
      this.element.style.left = `${this.left}px`
      this.element.style.top = `${this.top}px`

  } 

  didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect()
      const obstacleRect = obstacle.element.getBoundingClientRect()

      //{left:50, top: 50, right: 150, bottom: 150}
      if(playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top ) {
          return true;
      } else {
          return false
      }


  }
}
