window.Bullet = (function (window) {

  const  {Unit} = window

  class Bullet extends  Unit {
    constructor (direction,
                 x_position,
                 y_position) {
      super(x_position, y_position, "../images/пуля.png");
      this.direction = direction;

    }
  }
  return Tower;
})(window);