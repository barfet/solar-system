import { NgModule, InjectionToken } from '@angular/core';

export interface AppConfig {
    planetsApiUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
    planetsApiUrl: process.env.PLANETS_API_BASE_URL
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
