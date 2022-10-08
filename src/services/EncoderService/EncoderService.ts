import MessageBuilder from './MessageBuilder/MessageBuilder.js';

export default class EncoderService {
  encode(message: string): MessageBuilder {
    return new MessageBuilder(message);
  }
}
