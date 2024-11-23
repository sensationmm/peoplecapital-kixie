import { getRequestOptions, MESSAGES_ENDPOINT } from "../utils/api";

export class MessageClass {
  static async getMessages() {
    return fetch(MESSAGES_ENDPOINT, getRequestOptions('GET'))
      .then(response => response.json())
      .then(data => ({ status: 'ok', messages: data}));
  }

  static async sendMessage(recipientPhone, messageText) {
    return fetch(MESSAGES_ENDPOINT, getRequestOptions('POST', {recipientPhone, messageText}))
      .then(response => response.json())
      .then(data => ({ status: 'ok', message: data}));
  }

  static async editMessage(messageId, messageText) {
    return fetch(`${MESSAGES_ENDPOINT}/${messageId}`, getRequestOptions('PUT', {messageText})).then(response => response.ok);
  }

  static async deleteMessage(messageId) {
    return fetch(`${MESSAGES_ENDPOINT}/${messageId}`, getRequestOptions('DELETE')).then(response => response.ok);
  }
}