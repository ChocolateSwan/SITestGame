window.Player = (function (window) {

  const  {Tower} = window
  const  {Man} = window
  const  {Base} = window
  const {Bullet} = window

  const LEFT = "LEFT";
  const RIGHT = "RIGHT";
  const UP = "UP";
  const DOWN = "DOWN";

  class Player {
    constructor (baseOptions, manOptions) {
      this.man = new Man(manOptions.manHealth,
        manOptions.manXpos,
        manOptions.manYpos);
      this.towers = [];
      this.base = new Base (baseOptions.baseHealth,
        baseOptions.baseXpos,
        baseOptions.baseYpos);
    }

    moveMan(direction){
      if (direction === UP){
        this.man.goUp();
      }
      if (direction === DOWN){
        this.man.goDown();
      }
      if (direction === RIGHT){
        this.man.goRight();
      }
      if (direction === LEFT){
        this.man.goLeft();
      }
    }

    shootMan(){
      if (this.man.direction === LEFT){
        return new Bullet (this.man.direction,
          this.man.x_position,
          this.man.y_position + this.man.height/2 + 1)
      } else {
        return new Bullet (this.man.direction,
          this.man.x_position + this.man.width + 1,
          this.man.y_position + this.man.height/2 + 1)
      }
    }
  }
  return Player;
})(window);