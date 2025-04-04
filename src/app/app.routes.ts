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
        path: '',
        component: PatientListComponent,
      },
      {
        path: ':id',
        resolve: [patientResolver],
        children: [
          {
            path: 'overview',
            component: PatientOverviewComponent,
          },
          {
            path: 'details',
            component: PatientDetailsComponent,
          },
        ],
      },
    ],
  },
];
