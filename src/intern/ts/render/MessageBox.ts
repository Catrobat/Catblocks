import { generateNewDOM } from '../../../library/js/integration/utils';

export class MessageBox {
  private static readonly DISPLAY_DURATION = 10000;
  private static readonly CONTAINER_ID = 'catblocks-message-container';
  private static messages: string[] = [];

  private constructor() {}

  /**
   * Show Message in a Box on the bottom of the screen.
   * @param message Message to show
   * @param time in milliseconds to show the message
   */
  public static show(message: string, time: number = MessageBox.DISPLAY_DURATION) {
    this.messages.push(message);
    MessageBox.render();

    setTimeout(() => {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i] === message) {
          this.messages.splice(i, 1);
          break;
        }
      }
      MessageBox.render();
    }, time);
  }

  /**
   * Create/remove or redraw messagebox.
   */
  private static render() {
    const container = document.getElementById(this.CONTAINER_ID);

    if (this.messages.length === 0 && container) {
      container.classList.remove('show');
      setTimeout(() => {
        container.parentNode?.removeChild(container);
      }, 500);
    } else if (container) {
      container.innerHTML = '';
      const ul = generateNewDOM(container, 'ul');
      for (const msg of this.messages) {
        generateNewDOM(ul, 'li', {}, msg);
      }
      container.classList.add('show');
    } else {
      const div = generateNewDOM(null, 'div', { id: this.CONTAINER_ID, class: 'message-box' });

      const ul = generateNewDOM(div, 'ul');
      for (const msg of this.messages) {
        generateNewDOM(ul, 'li', {}, msg);
      }
      document.body.appendChild(div);
      div.classList.add('show');
    }
  }
}
