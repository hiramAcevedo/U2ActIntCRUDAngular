import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';

/**
 * Componente para mostrar la lista de eventos
 * Implementa la funcionalidad de listar y eliminar (READ y DELETE del CRUD)
 */
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, LucideAngularModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  
  constructor(
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}
  
  /**
   * Inicializa el componente cargando la lista de eventos
   */
  ngOnInit(): void {
    this.loadEvents();
  }
  
  /**
   * Carga todos los eventos desde el servicio
   */
  loadEvents(): void {
    this.events = this.eventService.getAllEvents();
  }
  
  /**
   * Elimina un evento por su ID
   * @param id ID del evento a eliminar
   */
  deleteEvent(id?: number): void {
    if (id === undefined) return;
    
    this.notificationService.showConfirmDialog({
      message: '¿Estás seguro de que deseas eliminar este evento?',
      onConfirm: () => {
        this.eventService.deleteEvent(id);
        this.loadEvents();
        this.notificationService.success('Evento eliminado con éxito');
      }
    });
  }
}
