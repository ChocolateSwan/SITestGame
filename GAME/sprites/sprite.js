window.Unit = (function () {
  // TODO адреса картинок
  class Unit  {
    constructor (x_position, y_position, srcOfImage, width, height) {
      this.x_position = x_position;
      this.y_position = y_position;
      this.image = new Image ();
      this.image.src = srcOfImage;
      this.width = width;
      this.height = height;
    }

    damaged (){};
  }
  return Unit;
})(window);