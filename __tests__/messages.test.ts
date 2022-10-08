import { Request, Response } from 'express';
import { postMessageHandler } from '../src/routes/message.routes.js';

describe('main test', () => {
  // const mockReq = jest;
  const mockRes = { json: jest.fn(), status: jest.fn() };
  mockRes.status.mockReturnValue(mockRes);
  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });
  it('POST / with valid message must return encoded message', () => {
    postMessageHandler(
      {
        body: {
          message: "That's one small step for man, one giant leap for mankind.",
        },
      } as Request,
      mockRes as unknown as Response,
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'tetaafi\nhsennon\nampotrd\ntafnlm\nsloeea\nolrgan\nnsmipk\n',
    });
  });
  it('POST / with message longer than 64 chars must return bad request', () => {
    postMessageHandler(
      {
        body: {
          message: 'c'.repeat(65),
        },
      } as Request,
      mockRes as unknown as Response,
    );
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Messages length should be less than 64 characters.',
    });
  });
});
