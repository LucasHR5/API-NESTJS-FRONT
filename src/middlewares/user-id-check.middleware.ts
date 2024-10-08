import { BadGatewayException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('antes do UserIdCheckMiddleware');
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadGatewayException('id Inválido!');
    }
    console.log('depois do UserIdCheckMiddleware');
    next();
  }
}
