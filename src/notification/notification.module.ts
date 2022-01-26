import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { Module, OnModuleInit } from '@nestjs/common';
import { QueueModule } from 'src/queue/queue.module';
import { QueueService } from 'src/queue/queue.service';
import {
  CLASS_NOTIFICATION_OPTIONS,
  FUNCTION_NOTIFICATION_OPTIONS,
  NotificationConfig,
  NotificationHandlerConfig,
} from './notification.decorator';
import { NotificationService } from './notification.service';

@Module({
  imports: [DiscoveryModule, QueueModule],
  providers: [NotificationService],
  exports: [QueueModule]
})
export class NotificationModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly queueService: QueueService,
  ) {}

  async onModuleInit() {
    const classNotifications =
      await this.discoveryService.providersWithMetaAtKey<NotificationConfig>(
        CLASS_NOTIFICATION_OPTIONS,
      );

      
      const functionNotifications =
      await this.discoveryService.providerMethodsWithMetaAtKey<NotificationHandlerConfig>(
          FUNCTION_NOTIFICATION_OPTIONS,
          );
          
    console.log('metadata: ', classNotifications);
    console.log(
      'function meta: ',
      functionNotifications,
    );
    for (const notification of classNotifications) {
      for (const functionItem of functionNotifications) {
        this.queueService.createHandler(
          (notification.discoveredClass.instance as any)[
            functionItem.discoveredMethod.methodName
          ],
          { config: notification.meta}
        );
      }
    }

  }
}
