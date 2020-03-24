
import $ from "jquery";

const DISPLAY_DURATION = 10000;
const CONTAINER_ID = 'catblocks-message-container';
const messages = [];

export class MessageBox {

  static show(message) {
    messages.push(message);
    MessageBox._render();

    setTimeout(() => {
      messages.shift();
      MessageBox._render();
    }, DISPLAY_DURATION);
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