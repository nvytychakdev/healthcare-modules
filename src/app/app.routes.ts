import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ModuleRegistryService } from '@healthcare/core';
import { ModuleStateService } from '../../projects/core/src/lib/services/module-state.service';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientOverviewComponent } from './pages/patient-overview/patient-overview.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { moduleConfigResolver } from './resolvers/module-config.resolver';
import { patientResolver } from './resolvers/patient.resolver';

const moduleResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot) => {
  const registry = inject(ModuleRegistryService);
  const moduleState = inject(ModuleStateService);

  const moduleId = route.paramMap.get('moduleId');
  if (!moduleId) return;

  const module = registry.enabledModules().find((m) => m.id === moduleId);
  if (module) moduleState.selectModule(module);
};

export const routes: Routes = [
  {
    path: '',
    resolve: [moduleConfigResolver],
    children: [
      {
        path: 'patients',
        component: PatientListComponent,
      },
      {
        path: 'patients/:patientId',
        resolve: [patientResolver],
        component: PatientLayoutComponent,
        children: [
          {
            path: 'overview',
            component: PatientOverviewComponent,
          },
          {
            path: 'details/:moduleId',
            resolve: [moduleResolver],
            component: PatientDetailsComponent,
          },
        ],
      },
      {
        path: 'views',
        component: PatientListComponent,
      },
      {
        path: 'organizations',
        component: PatientListComponent,
      },
      {
        path: 'settings',
        component: PatientListComponent,
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'settings',
        component: ProfileSettingsComponent,
      },
    ],
  },
];
