/**
 * Tipos de eventos disponibles
 */
export enum EventType {
  WEDDING = 'Boda',
  BIRTHDAY = 'Cumpleaños',
  SWEET_FIFTEEN = 'XV Años',
  CORPORATE = 'Corporativo',
  CONFERENCE = 'Conferencia',
  BAPTISM = 'Bautizo',
  ANNIVERSARY = 'Aniversario',
  GRADUATION = 'Graduación',
  BABY_SHOWER = 'Baby Shower',
  GENDER_REVEAL = 'Gender Reveal',
  RELIGIOUS = 'Religioso',
  NETWORKING = 'Networking',
  WORKSHOP = 'Taller',
  CONCERT = 'Concierto',
  EXHIBITION = 'Exposición',
  OTHER = 'Otro'
}

/**
 * Modelo de datos para Eventos
 * Representa un evento con sus propiedades básicas
 */
export interface Event {
  id?: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  eventType: EventType;
  maxAttendees: number;
  currentAttendees?: number;
  isVirtual: boolean;
  isSurprise: boolean;
}

/**
 * Modelo para los invitados a un evento
 */
export interface Guest {
  id?: number;
  eventId: number;
  name: string;
  origin?: string; // De dónde viene
  companions: number; // Número de acompañantes
  confirmed: boolean; // Si ha confirmado asistencia
  relationship?: string; // Parentesco o relación con los anfitriones
  notes?: string; // Notas adicionales
} 