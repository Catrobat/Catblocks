import { generateNewDOM } from '../../../library/js/integration/utils';

// default display duration
const DISPLAY_DURATION = 10000;
const CONTAINER_ID = 'catblocks-message-container';
const messages = [];

export class MessageBox {
  /**
   * Show Message in a Box on the bottom of the screen.
   * @static
   * @param {*} message
   * @param {*} [time=DISPLAY_DURATION] ms of time to show the message
   * @memberof MessageBox
   */
  static show(message, time = DISPLAY_DURATION) {
    messages.push(message);
    MessageBox._render();

    setTimeout(() => {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i] === message) {
          messages.splice(i, 1);
          break;
        }
      }
      MessageBox._render();
    }, time);
  }

  /**
   * Create/remove or redraw messagebox.
   * @static
   * @pirvate
   * @memberof MessageBox
   */
  static _render() {
    const container = document.getElementById(CONTAINER_ID);
    if (messages.length === 0) {
      container.style.transition = 'opacity 0.5s';
      container.style.opacity = 0;
      setTimeout(() => {
        container.parentNode.removeChild(container);
      }, 500);
    } else if (container) {
      container.innerHTML = '';
      const ul = generateNewDOM(container, 'ul');
      for (const msg of messages) {
        generateNewDOM(ul, 'li', {}, msg);
      }
    } else {
      const div = generateNewDOM(null, 'div', { id: CONTAINER_ID, class: 'message-box' });

      const ul = generateNewDOM(div, 'ul');
      for (const msg of messages) {
        generateNewDOM(ul, 'li', {}, msg);
      }

      div.style.transition = 'opacity 0.5s';
      div.style.opacity = 0;
      document.body.appendChild(div);
      div.style.opacity = 1;
    }
  }
}
