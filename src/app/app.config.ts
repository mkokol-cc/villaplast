import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryDataService } from './services/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 0 })
    ),
  ]
};
