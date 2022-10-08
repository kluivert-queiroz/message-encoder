import { Router } from 'express';
import { Request, Response } from 'express';
import EncoderService from '../services/EncoderService/EncoderService.js';
import UnsupportedMessageMessageError from '../services/EncoderService/exceptions/UnsupportedMessageError.js';

export const route = Router();
export const postMessageHandler = (req: Request, res: Response): void => {
  const { message } = req.body;
  try {
    const encoderService = new EncoderService();
    res.json({
      message: encoderService.encode(message).setTrailingChar('\n').build(),
    });
  } catch (err: unknown) {
    if (err instanceof UnsupportedMessageMessageError) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

route.post('/', postMessageHandler);
