import UnsupportedMessageMessageError from '../../../src/services/EncoderService/exceptions/UnsupportedMessageError.js';
import MessageBuilder from '../../../src/services/EncoderService/MessageBuilder/MessageBuilder.js';

describe('message builder', () => {
  it('given valid string should encode', () => {
    const message =
      "That's one small step for man, one giant leap for mankind.";
    const messageBuilder = new MessageBuilder(message);
    const encodedMessage = messageBuilder.build();
    expect(encodedMessage).toBe(
      'tetaafi\nhsennon\nampotrd\ntafnlm\nsloeea\nolrgan\nnsmipk\n',
    );
  });
  it('must support custom trailing char', () => {
    const message =
      "That's one small step for man, one giant leap for mankind.";
    const messageBuilder = new MessageBuilder(message);
    const encodedMessage = messageBuilder.setTrailingChar(' ').build();
    expect(encodedMessage).toBe(
      'tetaafi hsennon ampotrd tafnlm sloeea olrgan nsmipk ',
    );
  });
  it('must support later message change', () => {
    const message =
      "That's one small step for man, one giant leap for mankind.";
    const messageBuilder = new MessageBuilder(message);
    const encodedMessage = messageBuilder
      .setMessage('A complete new message!')
      .build();
    expect(encodedMessage).toBe('ales\ncewa\notmg\nmeee\npns\n');
  });
  it('given string longer than 64 chars should throw error', () => {
    const message = 'c'.repeat(65);
    expect(() => new MessageBuilder(message)).toThrow(
      UnsupportedMessageMessageError,
    );
  });
});
