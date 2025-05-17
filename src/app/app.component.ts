import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

/**
 * Componente principal de la aplicación
 * Define la estructura básica de la interfaz
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    NotificationComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'U2ActIntCRUDAngular - Sistema de Gestión de Eventos';
}
