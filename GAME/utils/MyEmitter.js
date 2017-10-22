window.Emitter = (function () {

  class Emitter {

    // Словарь с подписками на события
    constructor (events) {
      console.info("Emitter constructor");
      this.__events = events;
    }

    // Подписаться на событие
    subscribe (eventName, func) {
      if (!this.__events[eventName]) {
        this.__events[eventName] = [];
      }
      this.__events[eventName].push(func);
    }

    // Событие
    // TODO use data
    emit (eventName, data) {
      // console.log("Emittor emit");
      const event = this.__events[eventName];
      // console.log(eventName);
      if (event) {
        event.forEach(fn => {
          fn.call(null, data);
        });
      }
    }

    // Отписка от события
    // TODO но это не точно
    unSubscribe(eventName, func){
      this.__events[eventName] = this.__events[eventName].filter(eventFn => eventFn !== func);
    }
  }

  return Emitter;

})(window);