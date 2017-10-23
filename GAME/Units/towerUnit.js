window.Tower = (function (window) {

  const TOWER_IMAGE_PATH = "images/towertest.png"
  const TOWER_WIDTH = 50;
  const TOWER_HEIGHT = 100;


  const  {Unit} = window

  class Tower extends  Unit {

    constructor (coolDown, x_position, y_position) {
      super(x_position,
        y_position,
        TOWER_IMAGE_PATH,
        TOWER_WIDTH,
        TOWER_HEIGHT);
      this.coolDown = coolDown;

    }
  }
  return Tower;
})(window);