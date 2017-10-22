window.Player = (function (window) {


  const  {Tower} = window
  const  {Man} = window
  const  {Base} = window

  class Player {
    constructor (baseXpos,baseYpos,baseHealth,
                 manXpos,manYpos,manHealth) {
      this.man = new Man(manHealth, manXpos, manYpos);
      this.towers = [];
      this.base = new Base (baseHealth,baseXpos,baseYpos);


    }
  }
  return Player;
})(window);