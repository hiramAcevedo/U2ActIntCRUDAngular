import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

/**
 * Configuración de rutas de la aplicación
 * Define las rutas para cada componente CRUD
 */
export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/new', component: EventFormComponent },
  { path: 'events/edit/:id', component: EventFormComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '**', redirectTo: '/events' }
];
