window.Base = (function (window) {

  const  {Unit} = window

  class Base extends  Unit {
    constructor (health = 100,
                 x_position,
                 y_position) {
      super(x_position, y_position, "../images/plate.gif");
      this.health  = health;

    }
  }
  return Tower;
})(window);