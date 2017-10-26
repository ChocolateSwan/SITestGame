window.Base = (function (window) {

  const BASE_IMAGE_PATH = "images/army.png"
  const BASE_WIDTH = 110;
  const BASE_HEIGHT = 110;

  const  {Unit} = window

  class Base extends  Unit {
    constructor (health = 100, x_position, y_position = 230) {
      super(x_position,
        y_position,
        BASE_IMAGE_PATH,
        BASE_WIDTH,
        BASE_HEIGHT);
      this.health  = health;
    }
  }
  return Base;
})(window);