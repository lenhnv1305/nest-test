import { Module, OnModuleInit } from '@nestjs/common';
import { QueueService } from './queue.service';

@Module({
  imports: [],
  providers: [QueueService],
  exports: [QueueService]
})
export class QueueModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {}
}
