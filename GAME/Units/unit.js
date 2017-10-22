window.Unit = (function () {

  // TODO адреса картинок
  class Unit  {
    constructor (x_position,
                 y_position,
                 type) {
      // if (this.constructor.name === Unit.name) {
      //   throw new TypeError('Can not create instance of Unit');
      // }
      this.x_position = x_position;
      this.y_position = y_position;
      this.image = new Image ();
      this.image.src = type;
    }
  }
  return Unit;
})(window);