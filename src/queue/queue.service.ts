import { Injectable, OnModuleInit } from '@nestjs/common';
import { Subject } from 'rxjs';
import { NotificationHandlerContext } from 'src/notification/notification.decorator';

@Injectable()
export class QueueService {
  private readonly subject = new Subject<string>();


  createHandler(handler: Function, context: NotificationHandlerContext) {
    if (handler) {
      this.subject.subscribe((value) => {
        handler(value, context);
      });
    }
  }

  createSuspiciousTransaction(user: { email: string; }) {
    this.subject.next(user.email);
    return user;
  }
}
