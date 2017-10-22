window.Mediator = (function (window) {

  const Emitter = window.Emitter;


  class Mediator {
    // Новый эмиттер в медиаторе
    constructor() {
      console.info("Mediator constructor");
      if (Mediator.__instance) {

        return Mediator.__instance;
      }
      Mediator.__instance = this;
      this.__emitter = new Emitter({});
    }

    static initialize() {
      console.info("Mediator initialize");
      new Mediator;
    }

    // Добавить обработчик события
    on(eventName, func) {
      console.info('Mediator on', arguments);
      this.__emitter.subscribe(eventName, func);
    }

    /**
     * Стриггерить событие
     * @param {String} eventName - имя события
     * @param {Object} [payload=null] - объект с данными события
     */
    // TODO wtf payload
    emit(eventName, payload = null) {
      // console.log(payload)
      // console.info('Mediator emit', arguments);
      this.__emitter.emit(eventName, payload);
    }

    /**
     * Убрать обработчик события
     * @param {String} eventName - имя события
     * @param {Function} func - функция-обработчик
     */
    off(eventName, func) {
      console.info('Mediator off', arguments);
      this.__emitter.unSubscribe(eventName, func);
    }
  }

  return Mediator;
})(window);