import EncoderService from '../../../src/services/EncoderService/EncoderService.js';
import MessageBuilder from '../../../src/services/EncoderService/MessageBuilder/MessageBuilder.js';

jest.mock('../../../src/services/EncoderService/MessageBuilder/MessageBuilder.js');
describe('encoder service', () => {
  it('should instance and return message builder', () => {
    const encodeService = new EncoderService();
    encodeService.encode('any-message');
    expect(MessageBuilder).toHaveBeenCalledWith('any-message');
  });
});
