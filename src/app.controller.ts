import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueService } from './queue/queue.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly queueService: QueueService) {}

  @Post('transaction')
  createTransaction(@Body() body: { email: string; }): { email: string; } {
    return this.queueService.createSuspiciousTransaction(body);
  }
}
