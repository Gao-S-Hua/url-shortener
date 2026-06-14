import { join } from 'node:path';
import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class StaticController {
  @Get()
  serveIndex(@Res() res: Response) {
    const indexPath = join(process.cwd(), 'static', 'index.html');
    res.sendFile(indexPath);
  }
}
