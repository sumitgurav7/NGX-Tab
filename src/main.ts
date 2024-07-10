
import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ThemingService, provideTheming } from '@fundamental-ngx/core/theming';
import { provideDialogService } from '@fundamental-ngx/core/dialog';
import { IconTabBarTextTypeExampleComponent } from './app/example/icon-tab-bar-text-type-example.component';

bootstrapApplication(IconTabBarTextTypeExampleComponent, {
    providers: [
      provideAnimations(),
      provideRouter([]),
      RtlService,
      provideTheming({
        defaultTheme: 'sap_horizon'
      }),
      provideDialogService()
    ],
  }).then((appRef: ApplicationRef) => appRef.injector.get(ThemingService).init());
  