import { Injectable } from '@angular/core';
import { Guest } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private readonly STORAGE_KEY = 'guests';
  private nextId = 1;
  
  constructor() { 
    // Inicializar el contador de ID basado en invitados existentes
    const guests = this.getAllGuests();
    if (guests.length > 0) {
      this.nextId = Math.max(...guests.map(guest => guest.id || 0)) + 1;
    }
  }

  /**
   * Obtiene todos los invitados almacenados
   */
  getAllGuests(): Guest[] {
    const guestsJson = localStorage.getItem(this.STORAGE_KEY);
    return guestsJson ? JSON.parse(guestsJson) : [];
  }

  /**
   * Obtiene invitados por ID de evento
   */
  getGuestsByEventId(eventId: number): Guest[] {
    return this.getAllGuests().filter(guest => guest.eventId === eventId);
  }

  /**
   * Obtiene un invitado específico por ID
   */
  getGuestById(id: number): Guest | undefined {
    return this.getAllGuests().find(guest => guest.id === id);
  }

  /**
   * Crea un nuevo invitado
   */
  createGuest(guest: Guest): Guest {
    const guests = this.getAllGuests();
    const newGuest = { ...guest, id: this.nextId++ };
    
    guests.push(newGuest);
    this.saveGuests(guests);
    
    return newGuest;
  }

  /**
   * Actualiza un invitado existente
   */
  updateGuest(guest: Guest): Guest | undefined {
    if (!guest.id) return undefined;
    
    const guests = this.getAllGuests();
    const index = guests.findIndex(g => g.id === guest.id);
    
    if (index === -1) return undefined;
    
    guests[index] = { ...guest };
    this.saveGuests(guests);
    
    return guests[index];
  }

  /**
   * Elimina un invitado por su ID
   */
  deleteGuest(id: number): boolean {
    const guests = this.getAllGuests();
    const initialLength = guests.length;
    
    const filteredGuests = guests.filter(guest => guest.id !== id);
    
    if (filteredGuests.length !== initialLength) {
      this.saveGuests(filteredGuests);
      return true;
    }
    
    return false;
  }

  /**
   * Elimina todos los invitados de un evento
   */
  deleteGuestsByEventId(eventId: number): boolean {
    const guests = this.getAllGuests();
    const initialLength = guests.length;
    
    const filteredGuests = guests.filter(guest => guest.eventId !== eventId);
    
    if (filteredGuests.length !== initialLength) {
      this.saveGuests(filteredGuests);
      return true;
    }
    
    return false;
  }

  /**
   * Guarda la lista de invitados en localStorage
   */
  private saveGuests(guests: Guest[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guests));
  }
} 