import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((error) => console.error(error));

if (isDevMode()) {
  void import('idb-keyval').then((m) => {
    (window as unknown as { idbKeyval: typeof m }).idbKeyval = m;
  });
}
