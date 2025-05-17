import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div *ngIf="notification" class="notification-container" [ngClass]="'notification-' + notification.type">
      <div class="notification">
        <div class="notification-icon">
          <lucide-icon *ngIf="notification.type === 'success'" name="check-circle" size="24"></lucide-icon>
          <lucide-icon *ngIf="notification.type === 'error'" name="alert-circle" size="24"></lucide-icon>
          <lucide-icon *ngIf="notification.type === 'warning'" name="alert-triangle" size="24"></lucide-icon>
          <lucide-icon *ngIf="notification.type === 'info'" name="info" size="24"></lucide-icon>
        </div>
        <div class="notification-content">
          <div class="notification-message">{{ notification.message }}</div>
        </div>
        <button class="notification-close" (click)="close()">
          <lucide-icon name="x" size="18"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
      animation: slideIn 0.3s ease;
    }
    
    .notification {
      display: flex;
      align-items: flex-start;
      padding: 16px;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification-icon {
      margin-right: 12px;
      display: flex;
      align-items: center;
    }
    
    .notification-content {
      flex: 1;
    }
    
    .notification-message {
      margin-bottom: 4px;
      font-size: 14px;
    }
    
    .notification-close {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
    
    .notification-success {
      border-left: 4px solid #10b981;
    }
    
    .notification-success .notification-icon {
      color: #10b981;
    }
    
    .notification-error {
      border-left: 4px solid #ef4444;
    }
    
    .notification-error .notification-icon {
      color: #ef4444;
    }
    
    .notification-warning {
      border-left: 4px solid #f59e0b;
    }
    
    .notification-warning .notification-icon {
      color: #f59e0b;
    }
    
    .notification-info {
      border-left: 4px solid #3b82f6;
    }
    
    .notification-info .notification-icon {
      color: #3b82f6;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(
      notification => this.notification = notification
    );
  }

  close(): void {
    this.notificationService.closeNotification();
  }
} 