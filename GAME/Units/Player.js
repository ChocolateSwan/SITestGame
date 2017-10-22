window.Player = (function (window) {


  const  {Tower} = window
  const  {Man} = window
  const  {Base} = window


  class Player {
    constructor (baseXpos,baseYpos,baseHealth,
                 manXpos,manYpos,manHealth) {
      this.man = new Man(manHealth, manXpos, manYpos);
      this.towers = [];
      this.base = new Base (baseHealth,baseXpos,baseYpos);
    }

    moveMan(direction){
      if (direction === "UP"){
        this.man.goUp();
      }
      if (direction === "DOWN"){
        this.man.goDown();
      }
      if (direction === "RIGHT"){
        this.man.goRight();
      }
      if (direction === "LEFT"){
        this.man.goLeft();
      }
    }

  }
  return Player;
})(window);