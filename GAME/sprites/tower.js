window.Tower = (function (window) {

  const TOWER_IMAGE_PATH = "images/towertest.png"
  const TOWER_WIDTH = 50;
  const TOWER_HEIGHT = 100;
  const TOWER_DAMAGE = 10;
  const TOWER_HEALTH = 100;

  const  {Unit} = window

  class Tower extends  Unit {

    constructor (coolDown, x_position, y_position) {
      super(x_position,
        y_position,
        TOWER_IMAGE_PATH,
        TOWER_WIDTH,
        TOWER_HEIGHT);
      this.coolDown = coolDown;
      this.damage = TOWER_DAMAGE;
      this.health = TOWER_HEALTH;

    }


    damaged (damage) {


    }


  }
  return Tower;
})(window);