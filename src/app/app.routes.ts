import { Routes } from '@angular/router';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientOverviewComponent } from './pages/patient-overview/patient-overview.component';
import { moduleConfigResolver } from './resolvers/module-config.resolver';
import { patientResolver } from './resolvers/patient.resolver';

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
        path: 'patients/:id',
        resolve: [patientResolver],
        children: [
          {
            path: 'overview',
            component: PatientOverviewComponent,
          },
          {
            path: 'details/:moduleId',
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
];
