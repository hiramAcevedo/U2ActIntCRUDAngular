import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Event, Guest } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { GuestService } from '../../services/guest.service';
import { NotificationService } from '../../services/notification.service';

/**
 * Componente para mostrar los detalles de un evento
 * Implementa la funcionalidad de leer un evento específico (parte del READ en CRUD)
 */
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, LucideAngularModule, FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  event?: Event;
  guests: Guest[] = [];
  
  // Para el formulario de invitado
  showGuestForm = false;
  isEditingGuest = false;
  newGuest: Guest = this.createEmptyGuest();
  
  // Para la búsqueda y filtrado de invitados
  searchTerm = '';
  filterConfirmed: 'all' | 'confirmed' | 'pending' = 'all';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private guestService: GuestService,
    private notificationService: NotificationService
  ) {}
  
  /**
   * Inicializa el componente cargando los detalles del evento
   */
  ngOnInit(): void {
    this.loadEvent();
  }
  
  /**
   * Carga los datos del evento según el id de la ruta
   */
  loadEvent(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.notificationService.error('ID de evento no proporcionado');
      this.router.navigate(['/events']);
      return;
    }

    const id = +idParam;
    if (isNaN(id)) {
      this.notificationService.error('ID de evento inválido');
      this.router.navigate(['/events']);
      return;
    }

    this.event = this.eventService.getEventById(id);
    
    // Si no se encuentra el evento, redirigir a la lista
    if (!this.event) {
      this.notificationService.error('Evento no encontrado');
      this.router.navigate(['/events']);
    } else {
      // Cargar invitados del evento
      this.loadGuests();
    }
  }
  
  /**
   * Elimina el evento actual y redirige a la lista
   */
  deleteEvent(): void {
    if (!this.event || !this.event.id) return;
    
    this.notificationService.showConfirmDialog({
      message: '¿Estás seguro de que deseas eliminar este evento? También se eliminarán todos los invitados.',
      onConfirm: () => {
        // Primero eliminar invitados asociados
        if (this.event?.id) {
          this.guestService.deleteGuestsByEventId(this.event.id);
        }
        
        this.eventService.deleteEvent(this.event!.id!);
        this.notificationService.success('Evento eliminado con éxito');
        this.router.navigate(['/events']);
      }
    });
  }
  
  /**
   * Carga los invitados del evento actual
   */
  loadGuests(): void {
    if (this.event?.id) {
      this.guests = this.guestService.getGuestsByEventId(this.event.id);
    }
  }
  
  /**
   * Filtra los invitados según los criterios de búsqueda
   */
  get filteredGuests(): Guest[] {
    if (!this.guests) return [];
    return this.guests.filter(guest => {
      // Filtrar por término de búsqueda
      const matchesSearch = this.searchTerm ? 
        guest.name.toLowerCase().includes(this.searchTerm.toLowerCase()) :
        true;
      
      // Filtrar por estado de confirmación
      let matchesConfirmation = true;
      if (this.filterConfirmed === 'confirmed') {
        matchesConfirmation = guest.confirmed;
      } else if (this.filterConfirmed === 'pending') {
        matchesConfirmation = !guest.confirmed;
      }
      
      return matchesSearch && matchesConfirmation;
    });
  }
  
  /**
   * Prepara el formulario para añadir un nuevo invitado
   */
  addGuest(): void {
    this.newGuest = this.createEmptyGuest();
    this.isEditingGuest = false;
    this.showGuestForm = true;
  }
  
  /**
   * Prepara el formulario para editar un invitado existente
   */
  editGuest(guest: Guest): void {
    this.newGuest = { ...guest };
    this.isEditingGuest = true;
    this.showGuestForm = true;
  }
  
  /**
   * Elimina un invitado
   */
  deleteGuest(id?: number): void {
    if (!id) return;
    
    this.notificationService.showConfirmDialog({
      message: '¿Estás seguro de que deseas eliminar este invitado?',
      onConfirm: () => {
        this.guestService.deleteGuest(id);
        this.loadGuests();
        this.notificationService.success('Invitado eliminado con éxito');
      }
    });
  }
  
  /**
   * Guarda un nuevo invitado o actualiza uno existente
   */
  saveGuest(): void {
    if (!this.newGuest.name) {
      this.notificationService.warning('El nombre del invitado es obligatorio');
      return;
    }
    
    if (this.isEditingGuest) {
      this.guestService.updateGuest(this.newGuest);
      this.notificationService.success('Invitado actualizado con éxito');
    } else {
      this.guestService.createGuest(this.newGuest);
      this.notificationService.success('Invitado agregado con éxito');
    }
    
    this.showGuestForm = false;
    this.loadGuests();
    
    // Actualiza el número de invitados confirmados en el evento
    this.updateEventAttendees();
  }
  
  /**
   * Cierra el formulario de invitados
   */
  cancelGuestForm(): void {
    this.showGuestForm = false;
  }
  
  /**
   * Crea un objeto de invitado vacío
   */
  private createEmptyGuest(): Guest {
    return {
      eventId: this.event?.id ?? 0,
      name: '',
      origin: '',
      companions: 0,
      confirmed: false,
      relationship: '',
      notes: ''
    };
  }
  
  /**
   * Actualiza el número de asistentes confirmados en el evento
   */
  private updateEventAttendees(): void {
    if (this.event?.id) {
      const confirmedGuests = this.guests.filter(guest => guest.confirmed);
      const attendeesCount = confirmedGuests.reduce((sum, guest) => sum + (guest.companions + 1), 0);
      
      if (this.event) {
        this.event.currentAttendees = attendeesCount;
        this.eventService.updateEvent(this.event);
      }
    }
  }
  
  /**
   * Obtiene el total de invitados incluyendo acompañantes
   */
  getTotalAttendees(): number {
    if (!this.guests || this.guests.length === 0) return 0;
    return this.guests.reduce((sum, guest) => sum + (guest.companions + 1), 0);
  }
  
  /**
   * Obtiene el total de invitados confirmados incluyendo acompañantes
   */
  getConfirmedAttendees(): number {
    if (!this.guests || this.guests.length === 0) return 0;
    return this.guests
      .filter(guest => guest.confirmed)
      .reduce((sum, guest) => sum + (guest.companions + 1), 0);
  }
}
