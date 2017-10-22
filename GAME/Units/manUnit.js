window.Man = (function (window) {

  const  {Unit} = window

  const SPEED = 40;

  class Man extends  Unit {
    constructor (health = 50,
                 x_position,
                 y_position) {
      super(x_position, y_position, "images/ufo.gif");
      this.health= health;
    }

// TODO ограничения
    goDown(){
      this.y_position += SPEED;
    }

    goUp(){
      this.y_position -= SPEED;
    }

    goRight(){
      this.x_position += SPEED;
    }

    goLeft(){
      this.x_position -= SPEED;
    }






  }




    return Man;
  })(window);