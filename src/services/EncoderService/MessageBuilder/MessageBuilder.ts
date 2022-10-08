import UnsupportedMessageMessageError from '../exceptions/UnsupportedMessageError.js';

export default class MessageBuilder {
  private message: string;
  private MAX_CHARS_LONG = 64;
  private numberOfColumns: number;
  private trailingChar = '\n';
  constructor(message: string) {
    this.message = message;
    this.init();
  }

  private init() {
    this.sanitize();
    if (this.message.length > this.MAX_CHARS_LONG)
      throw new UnsupportedMessageMessageError(
        'Messages length should be less than 64 characters.',
      );
    this.numberOfColumns = Math.ceil(Math.sqrt(this.message.length));
  }
  private sanitize(): MessageBuilder {
    this.message = this.message
      .replace(/[^\w]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
    return this;
  }

  private breakMessageIntoColumns(): string[] {
    const charsPerRow = this.numberOfColumns;
    const regex = new RegExp(`\\w{${charsPerRow}}|\\w+`, 'g');
    const brokeMessage = this.message
      .match(regex)
      .map((message) => message.padEnd(charsPerRow));
    return brokeMessage;
  }
  private encode(message: string[]): string {
    let encodedMessage = '';
    for (let col = 0; col < this.numberOfColumns; col++) {
      for (let row = 0; row < message.length; row++) {
        if (message[row][col] && message[row][col] !== ' ')
          encodedMessage += message[row][col];
      }
      encodedMessage += this.trailingChar;
    }
    return encodedMessage;
  }
  setMessage(message: string): MessageBuilder {
    this.message = message;
    this.init();
    return this;
  }
  setTrailingChar(trailingChar: string): MessageBuilder {
    this.trailingChar = trailingChar;
    return this;
  }
  build(): string {
    const brokeMessage = this.breakMessageIntoColumns();
    return this.encode(brokeMessage);
  }
}
