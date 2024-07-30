import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/authentication.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(
            withInterceptorsFromDi()
        ),
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
};
