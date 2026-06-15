import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Response } from 'express';
import { INDEX_HTML_PATH } from '../constants';

@ApiExcludeController()
@Controller()
export class StaticController {
  @Get()
  serveIndex(@Res() res: Response) {
    res.sendFile(INDEX_HTML_PATH);
  }
}
