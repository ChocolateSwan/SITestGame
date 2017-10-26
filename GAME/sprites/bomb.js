window.Bomb = (function (window) {

  const BOMB_IMAGE_PATH = "images/bomb.png"
  const BOMB_WIDTH = 30;
  const BOMB_HEIGHT = 30;


  const  {Unit} = window

  class Bomb extends  Unit {

    constructor (x_position, y_position) {
      super(x_position,
        y_position,
        BOMB_IMAGE_PATH,
        BOMB_WIDTH,
        BOMB_HEIGHT);
    }
  }
  return Bomb;
})(window);