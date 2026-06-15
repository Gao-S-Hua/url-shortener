import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Response } from 'express';
import { INDEX_HTML_PATH } from '../constants';
import { RedirectService } from './redirect.service';

@ApiExcludeController()
@Controller()
export class RedirectController {
  private readonly logger = new Logger(RedirectController.name);

  constructor(private readonly redirectService: RedirectService) {}

  @Get(':code')
  async redirect(@Param('code') shortCode: string, @Res() res: Response) {
    const originalUrl = await this.redirectService.redirect(shortCode);
    if (!originalUrl) {
      this.logger.warn(`Short code not found: ${shortCode}`);
      return res.sendFile(INDEX_HTML_PATH);
    }
    res.redirect(302, originalUrl);
  }
}
