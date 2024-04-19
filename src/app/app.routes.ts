import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search',
    title: 'Search',
    loadComponent: () =>
      import('./pages/search-page/search-page.component').then(
        (m) => m.SearchPageComponent
      ),
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
