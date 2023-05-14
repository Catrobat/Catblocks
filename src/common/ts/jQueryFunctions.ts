export class jQueryFunctions {
  /**
   * Mockup for $('body').on('click', ....
   * Where the callback gets two parameters, the event itself and the element where the listener is registered to.
   * @param querySelector Selector where the click event should be bound on
   * @param callback Called function on click
   */
  public static addBodyClickListener(
    querySelector: string,
    callback: (_event: Event, _eventRoot: Element | null) => void
  ): void {
    document.querySelector('body')?.addEventListener('click', event => {
      const eventRoot = (event.target as Element)?.closest(querySelector);
      if ((event.target as Element)?.matches(querySelector) || eventRoot?.contains(event.target as Node)) {
        callback(event, eventRoot);
      }
    });
  }

  /**
   * Mockup for $(element).on(eventName, callback)
   * Added the third parameter 'eventHandler' to the callback, so you can detach
   * this event by using element.removeEventListener(eventHandler)
   * @param element Element to bind the event on
   * @param eventName Eventname to attach on element
   * @param callback Called function on fired event
   */
  public static onEvent(
    element: Element,
    eventName: string,
    callback: (_event: Event, _eventRoot: Element, _eventHandler: (_event: Event) => void) => void
  ): void {
    const eventHandler = (event: Event) => {
      callback(event, element, eventHandler);
    };
    element.addEventListener(eventName, eventHandler);
  }
}
