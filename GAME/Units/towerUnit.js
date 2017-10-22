window.Tower = (function (window) {

  const  {Unit} = window

  class Tower extends  Unit {
    constructor (coolDown,
                 x_position,
                 y_position) {
      super(x_position, y_position, "images/tower.png");
      this.coolDown = coolDown;

    }
  }
  return Tower;
})(window);