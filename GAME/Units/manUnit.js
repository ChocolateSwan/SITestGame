window.Man = (function (window) {

  const  {Unit} = window

  class Man extends  Unit {
    constructor (health = 50,
                 x_position,
                 y_position) {
      super(x_position, y_position, "images/ufo.gif");
      this.health= health;


    }
  }
    return Man;
  })(window);