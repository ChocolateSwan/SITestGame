window.Unit = (function (window) {

  const UNIT_ALIEN_IMAGE_PATH_RIGHT_DIRECTION = "images/alienUnit_rightDirection.png";
  const UNIT_ALIEN_IMAGE_PATH_LEFT_DIRECTION = "images/alienUnit_leftDirection.png";
  const UNIT_MAN_IMAGE_PATH_RIGHT_DIRECTION = "images/spaceMan_rightDirection.png";
  const UNIT_MAN_IMAGE_PATH_LEFT_DIRECTION = "images/spaceMan_leftDirection.png";
  const UNIT_WIDTH = 50;
  const UNIT_HEIGHT = 50;
  const UNIT_DAMAGE = 10;

  const LEFT = "LEFT";
  const RIGHT = "RIGHT";

  const  {Sprite} = window;

  const modelWidth = 960;
  const modelHeight = 640;

  const SPEED = 5;

  class Unit extends  Sprite {
    constructor (health = 100, x_position, y_position = 260, type = "alien") {
      super(x_position,
        y_position,
        type === "alien"? UNIT_ALIEN_IMAGE_PATH_RIGHT_DIRECTION: UNIT_MAN_IMAGE_PATH_LEFT_DIRECTION,
        UNIT_WIDTH,
        UNIT_HEIGHT);
      this.health= health;
      this.direction = LEFT;
      this.coolDown = 0;
      this.damage = UNIT_DAMAGE;
      if (type === "alien"){
        console.log(type);
        this.srcImageRightDirection = UNIT_ALIEN_IMAGE_PATH_RIGHT_DIRECTION;
        this.srcImageLeftDirection = UNIT_ALIEN_IMAGE_PATH_LEFT_DIRECTION;
      } else {
        this.srcImageRightDirection = UNIT_MAN_IMAGE_PATH_RIGHT_DIRECTION;
        this.srcImageLeftDirection = UNIT_MAN_IMAGE_PATH_LEFT_DIRECTION;
      }
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
      // TODO сделать более адекватно
      this.image.src = this.srcImageRightDirection;
    }

    goLeft(){
      this.x_position -= SPEED;
      this.direction = LEFT;
      if (this.x_position < 0){
        this.x_position = 0;
        }
      // TODO сделать более адекватно
      this.image.src = this.srcImageLeftDirection;
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
    return Unit;
  })(window);