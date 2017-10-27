window.GameStrategy = (function (window) {

  class GameStrategy {
    constructor() {
      console.info('Game Strategy create');
      if (this.constructor.name === GameStrategy.name) {
        throw new TypeError('Can not create instance of GameStrategy');
      }
      this.state = null;
    }

    onLoggedIn(payload) {
      console.info('GameStrategy onLoggedIn', arguments);
      throw new TypeError('Not implemented');
    }

    onNewCommand(payload) {
      console.info('GameStrategy onNewCommand', arguments);
      throw new TypeError('Not implemented');
    }

    destroy() {
      //TODO

    }
  }

  return GameStrategy;
})(window);