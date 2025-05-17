import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Event, EventType } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';

/**
 * Componente para crear y editar eventos
 * Implementa la funcionalidad CREATE y UPDATE del CRUD
 */
@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  event: Event = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    location: '',
    organizer: '',
    eventType: EventType.OTHER,
    maxAttendees: 0,
    currentAttendees: 0,
    isVirtual: false,
    isSurprise: false
  };
  
  // Para uso en el template
  eventTypes = Object.values(EventType);
  
  isEditMode = false;
  
  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}
  
  /**
   * Inicializa el componente y determina si es modo edición o creación
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // Modo edición
      this.isEditMode = true;
      const eventFound = this.eventService.getEventById(+id);
      
      if (eventFound) {
        this.event = {...eventFound};
      } else {
        this.notificationService.error('Evento no encontrado');
        this.router.navigate(['/events']);
      }
    }
  }
  
  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Validación básica
    if (!this.event.title || !this.event.location || !this.event.organizer) {
      this.notificationService.warning('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (this.isEditMode) {
      this.eventService.updateEvent(this.event);
      this.notificationService.success('Evento actualizado con éxito');
    } else {
      this.eventService.createEvent(this.event);
      this.notificationService.success('Evento creado con éxito');
    }
    
    this.router.navigate(['/events']);
  }
}
