import {
  ChannelType,
  Notification,
  NotificationHandler,
  NotificationHandlerContext,
} from './notification.decorator';

@Notification({
  type: 'SuspiciousTransaction',
  channels: [ChannelType.Email],
  form: [
    {
      type: 'button',
      name: 'confirm',
      label: 'Is suspicious transaction',
      action: 'is_suspicious_transaction',
    },
    {
      type: 'button',
      name: 'confirm',
      label: 'Is not suspicious transaction',
      action: 'is_not_suspicious_transaction',
    },
  ],
})
export class NotificationService {

  @NotificationHandler({})
  handleAction(userEmail: string, context: NotificationHandlerContext) {
    console.log('-------------------------------');
    console.log('');
    for (const channel of context.config.channels) {
      switch (channel) {
        case ChannelType.Email:
            console.log(`[${channel}] Building email template`);
          console.log(`
<h1>Suspicious transaction</h1>

<p>User email: ${userEmail}</p>

${context.config.form.map(
    (x) => `<button>${x.label}</button> `,
)}
`);
          console.log(`[${channel}] Email sent`);
          console.log('');
          console.log('-------------------------------');
          break;
        default:
            throw new Error();
      }
    }
  }
}
