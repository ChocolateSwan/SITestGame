window.Man = (function (window) {

  const MAN_IMAGE_PATH = "images/alienUnit.png"
  const MAN_WIDTH = 50;
  const MAN_HEIGHT = 50;
  const MAN_DAMAGE = 10;

  const LEFT = "LEFT";
  const RIGHT = "RIGHT";

  const  {Unit} = window;

  const modelWidth = 960;
  const modelHeight = 640;

  const SPEED = 5;

  class Man extends  Unit {
    constructor (health = 50, x_position, y_position = 260) {
      super(x_position,
        y_position,
        MAN_IMAGE_PATH,
        MAN_WIDTH,
        MAN_HEIGHT);
      this.health= health;
      this.direction = LEFT;
      this.coolDown = 0;
      this.damage = MAN_DAMAGE;
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
      this.direction = RIGHT;
      if (this.x_position + this.width > modelWidth){
        this.x_position = modelWidth - this.width;
      }
    }

    goLeft(){
      this.x_position -= SPEED;
      this.direction = LEFT;
      if (this.x_position < 0){
        this.x_position = 0;
        }
    }

    // TODO обработка смерти
    damaged(sprite){
      this.health -= sprite.damage;
      if (this.health < 0){
        this.health = 0;
      }
    }

    setCoolDown(coolDown){
      this.coolDown = coolDown;
    }
  }
    return Man;
  })(window);