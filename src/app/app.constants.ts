import { NgToastConfig } from 'ng-angular-popup';

export const TOAST_CONFIG: NgToastConfig = {
  duration: 5000,
  maxToasts: 3,
  width: 400,
  showProgress: true,
  dismissible: true,
  showIcon: true,
  enableAnimations: true,
} as const;
