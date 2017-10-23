window.Man = (function (window) {

  const  {Unit} = window

  const modelWidth = 960;
  const modelHeight = 640;

  const SPEED = 5;

  class Man extends  Unit {
    constructor (health = 50,
                 x_position,
                 y_position) {
      super(x_position, y_position, "images/alien.png", 50,50); //images/ufo.gif
      this.health= health;
      this.direction = "LEFT";
      this.coolDown = 0;
    }

    goDown(){
      this.y_position += SPEED;
      if (this.y_position + this.height > modelHeight){
        this.y_position = modelHeight - this.height;
      }
    }

    goUp(){
      this.y_position -= SPEED;
      if (this.y_position < 0){
        this.y_position = 0;
      }
    }

    goRight(){
      this.x_position += SPEED;
      this.direction = "RIGHT";
      if (this.x_position + this.width > modelWidth){
        this.x_position = modelWidth - this.width;
      }
    }

    goLeft(){
      this.x_position -= SPEED;
      this.direction = "LEFT";
      if (this.x_position < 0){
        this.x_position = 0;
        }
    }

    setCoolDown(coolDown){
      this.coolDown = coolDown;
    }

  }

    return Man;
  })(window);