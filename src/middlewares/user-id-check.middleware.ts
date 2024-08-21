import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { isUUID } from 'class-validator';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log('UserIdCheckMiddleware', 'antes');

    if (!isUUID(req.params.id)) {
      throw new BadRequestException('Invalid ID format!');
    }

    console.log('UserIdCheckMiddleware', 'depois');

    next();
  }
}
