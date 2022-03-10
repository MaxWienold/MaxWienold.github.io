let pubsub = (function (params) {
    let events = {};

  // publish
  let emit = function(eventName, data) {
    console.log(eventName);
    
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  };


  // subscribe
  let subscribe = function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);

  };

  // unsubscribe
  let unsubscribe =  function(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((item) => {
          return item.name !== fn.name;
        });
    }
  };

  return {
      events: events,
      emit: emit,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
  }


})()