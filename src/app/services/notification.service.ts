import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  actions?: {
    label: string;
    callback: () => void;
  }[];
  autoClose?: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // BehaviorSubject para notificaciones y confirmaciones
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  private confirmDialogSubject = new BehaviorSubject<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
  } | null>(null);

  // Observables públicos
  notification$ = this.notificationSubject.asObservable();
  confirmDialog$ = this.confirmDialogSubject.asObservable();

  constructor() {}

  /**
   * Muestra una notificación
   */
  showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
    
    // Auto cerrar la notificación después del tiempo especificado
    if (notification.autoClose !== false) {
      setTimeout(() => {
        this.closeNotification();
      }, notification.duration || 3000);
    }
  }

  /**
   * Cierra la notificación actual
   */
  closeNotification(): void {
    this.notificationSubject.next(null);
  }

  /**
   * Muestra un diálogo de confirmación personalizado
   */
  showConfirmDialog(options: {
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
  }): void {
    this.confirmDialogSubject.next({
      message: options.message,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      confirmLabel: options.confirmLabel || 'Aceptar',
      cancelLabel: options.cancelLabel || 'Cancelar'
    });
  }

  /**
   * Cierra el diálogo de confirmación
   */
  closeConfirmDialog(): void {
    this.confirmDialogSubject.next(null);
  }

  /**
   * Función de ayuda para mostrar un mensaje de éxito
   */
  success(message: string): void {
    this.showNotification({
      message,
      type: 'success',
      autoClose: true,
      duration: 3000
    });
  }

  /**
   * Función de ayuda para mostrar un mensaje de error
   */
  error(message: string): void {
    this.showNotification({
      message,
      type: 'error',
      autoClose: true,
      duration: 5000
    });
  }

  /**
   * Función de ayuda para mostrar un mensaje de advertencia
   */
  warning(message: string): void {
    this.showNotification({
      message,
      type: 'warning',
      autoClose: true,
      duration: 4000
    });
  }

  /**
   * Función de ayuda para mostrar un mensaje informativo
   */
  info(message: string): void {
    this.showNotification({
      message,
      type: 'info',
      autoClose: true,
      duration: 3000
    });
  }
} 