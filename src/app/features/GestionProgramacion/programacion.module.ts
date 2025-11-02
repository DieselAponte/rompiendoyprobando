const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'scheduling', loadChildren: () => import('./features/scheduling/scheduling.module').then(m => m.SchedulingModule) },
      { path: 'purchasing', loadChildren: () => import('./features/purchasing/purchasing.module').then(m => m.PurchasingModule) },
      { path: 'distribution', loadChildren: () => import('./features/distribution/distribution.module').then(m => m.DistributionModule) },
      { path: 'storage', loadChildren: () => import('./features/storage/storage.module').then(m => m.StorageModule) },
      { path: '', redirectTo: '/scheduling', pathMatch: 'full' },
    ]
  },
];
