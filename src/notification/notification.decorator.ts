import { InjectableOptions, SetMetadata } from '@nestjs/common';

export const INJECTABLE_WATERMARK = '__injectable__';
export const SCOPE_OPTIONS_METADATA = 'scope:options';
export const CLASS_NOTIFICATION_OPTIONS = '__notification_options__';
export const FUNCTION_NOTIFICATION_OPTIONS = Symbol('NOTIFICATION_CONFIG');

export enum ChannelType {
    Email = 'EMAIL',
    Telegram = 'TELEGRAM'
}

export interface NotificationHandlerContext {
    config: NotificationConfig
}

export interface NotificationConfig {
  type: string;
  channels: ChannelType[];
  form: ActionButton[];
}

export interface NotificationHandlerConfig {
  action?: string;
}

export interface ActionButton {
  type: 'button';
  name: 'confirm';
  label: string;
  action: string;
}

export function NotificationHandler(
  input: NotificationHandlerConfig,
): MethodDecorator {
  return function (target, key, descriptor) {
    SetMetadata(FUNCTION_NOTIFICATION_OPTIONS, { ...input })(
      target,
      key,
      descriptor,
    );
  };
}

export function Notification(
  config: NotificationConfig,
  options?: InjectableOptions,
): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(CLASS_NOTIFICATION_OPTIONS, config, target);
  };
}

// export const NotificationHandler = makeNotificationDecorator({ action: 'handler' });
