import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class RedirectController {
  @Get(':code')
  redirect(@Param('code') shortCode: string, @Res() res: Response) {
    // TODO: Look up the original URL from a database and issue a 301/302 redirect.
    res.status(404).json({ message: `Short URL '${shortCode}' not found` });
  }
}
