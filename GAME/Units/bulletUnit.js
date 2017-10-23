window.Bullet = (function (window) {

  const  {Unit} = window

  class Bullet extends Unit {
    constructor (direction,
                 x_position,
                 y_position) {
      super(x_position, y_position, "images/bullet.png",25,25);
      this.direction = direction;

    }
  }
  return Bullet;
})(window);