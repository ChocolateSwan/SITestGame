window.Bullet = (function (window) {

  const BULLET_IMAGE_PATH = "images/bullet.png"
  const BULLET_WIDTH = 25;
  const BULLET_HEIGHT = 25;

  const  {Unit} = window

  class Bullet extends Unit {
    constructor (direction, x_position, y_position, damage) {
      super(x_position,
        y_position,
        BULLET_IMAGE_PATH,
        BULLET_WIDTH,
        BULLET_HEIGHT);
      this.direction = direction;
      this.damage = damage;
    }
  }
  return Bullet;
})(window);