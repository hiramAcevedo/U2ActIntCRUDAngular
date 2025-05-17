import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly STORAGE_KEY = 'events';
  private nextId = 1;
  
  constructor() { 
    // Inicializar el contador de ID basado en eventos existentes
    const events = this.getAllEvents();
    if (events.length > 0) {
      this.nextId = Math.max(...events.map(event => event.id || 0)) + 1;
    }
  }

  /**
   * Obtiene todos los eventos almacenados
   * @returns Array de eventos
   */
  getAllEvents(): Event[] {
    const eventsJson = localStorage.getItem(this.STORAGE_KEY);
    return eventsJson ? JSON.parse(eventsJson) : [];
  }

  /**
   * Obtiene un evento específico por su ID
   * @param id ID del evento a buscar
   * @returns El evento encontrado o undefined
   */
  getEventById(id: number): Event | undefined {
    return this.getAllEvents().find(event => event.id === id);
  }

  /**
   * Crea un nuevo evento
   * @param event Datos del evento a crear (sin ID)
   * @returns El evento creado con su ID asignado
   */
  createEvent(event: Event): Event {
    const events = this.getAllEvents();
    const newEvent = { ...event, id: this.nextId++, currentAttendees: 0 };
    
    events.push(newEvent);
    this.saveEvents(events);
    
    return newEvent;
  }

  /**
   * Actualiza un evento existente
   * @param event Evento con datos actualizados
   * @returns El evento actualizado o undefined si no se encontró
   */
  updateEvent(event: Event): Event | undefined {
    if (!event.id) return undefined;
    
    const events = this.getAllEvents();
    const index = events.findIndex(e => e.id === event.id);
    
    if (index === -1) return undefined;
    
    events[index] = { ...event };
    this.saveEvents(events);
    
    return events[index];
  }

  /**
   * Elimina un evento por su ID
   * @param id ID del evento a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  deleteEvent(id: number): boolean {
    const events = this.getAllEvents();
    const initialLength = events.length;
    
    const filteredEvents = events.filter(event => event.id !== id);
    
    if (filteredEvents.length !== initialLength) {
      this.saveEvents(filteredEvents);
      return true;
    }
    
    return false;
  }

  /**
   * Guarda la lista de eventos en localStorage
   * @param events Lista de eventos a guardar
   */
  private saveEvents(events: Event[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
  }
}
