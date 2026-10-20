import { NgToastConfig } from 'ng-angular-popup';

export const PRIMEUI_LICENSE_KEY =
  'eyJpZCI6IjNhZjY2MzEzLTJiMTItNDE1Yi05NmIyLWZkMTU4ODZhMzA2NCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTI0MjUyMTgsImV4cCI6MTgyMzk2MTIxOH0._Vnoajtra-ouoilJapyDMJReRw68_OLoRfwplxfUe-fdjznogyblfPbR9QzwJwdOroeWABpQ2Gce4JXlklEKBg';

export const TOAST_CONFIG: NgToastConfig = {
  duration: 5000,
  maxToasts: 3,
  width: 400,
  showProgress: true,
  dismissible: true,
  showIcon: true,
  enableAnimations: true,
} as const;
