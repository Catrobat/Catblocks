export class jQueryFunctions {
  /**
   * Mockup for $('body').on('click', ....
   * Where the callback gets two parameters, the event itself and the element where the listener is registered to.
   * @param {string} querySelector Selector where the click event should be bound on
   * @param {Function} callback Called function on click
   */
  static addBodyClickListener(querySelector, callback) {
    document.querySelector('body').addEventListener('click', event => {
      const eventRoot = event.target.closest(querySelector);
      if (event.target.matches(querySelector) || eventRoot?.contains(event.target)) {
        callback(event, eventRoot);
      }
    });
  }

  /**
   * Mockup for $(element).on(eventName, callback)
   * Added the third parameter 'eventHandler' to the callback, so you can detach
   * this event by using element.removeEventListener(eventHandler)
   * @param {HTMLElement} element Element to bind the event on
   * @param {string} eventName Eventname to attach on element
   * @param {function} callback Called function on fired event
   */
  static onEvent(element, eventName, callback) {
    const eventHandler = event => {
      callback(event, element, eventHandler);
    };
    element.addEventListener(eventName, eventHandler);
  }
}
