
import $ from "jquery";

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

  static _render() {
    if (messages.length === 0) {
      $(`#${CONTAINER_ID}`).fadeOut("slow", () => {
        $(`#${CONTAINER_ID}`).remove();
      });

    } else if ($(`#${CONTAINER_ID}`).length) {
      const $ul = $('<ul/>');
      for (const msg of messages) {
        const $li = $(`<li>${msg}</li>`);
        $ul.prepend($li);
      }
      $(`#${CONTAINER_ID}`).html($ul);

    } else {
      const $div = $('<div />', {
        id: CONTAINER_ID,
        class: 'message-box'
      });

      const $ul = $('<ul/>');
      for (const msg of messages) {
        const $li = $(`<li>${msg}</li>`);
        $ul.prepend($li);
      }

      $div.append($ul);
      $('body').append($div);
      $(`#${CONTAINER_ID}`).fadeIn("slow");
    }
  }
}