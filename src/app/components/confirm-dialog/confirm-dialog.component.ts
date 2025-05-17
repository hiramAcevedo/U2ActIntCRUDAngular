import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="overlay" *ngIf="isOpen" (click)="handleOverlayClick($event)">
      <div class="dialog">
        <div class="dialog-header">
          <lucide-icon name="alert-triangle" size="24" class="dialog-icon"></lucide-icon>
          <button class="close-button" (click)="handleCancel()">
            <lucide-icon name="x" size="18"></lucide-icon>
          </button>
        </div>
        <div class="dialog-content">
          <p class="dialog-message">{{ message }}</p>
        </div>
        <div class="dialog-actions">
          <button class="btn-cancel" (click)="handleCancel()">
            {{ cancelLabel }}
          </button>
          <button class="btn-confirm" (click)="handleConfirm()">
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }
    
    .dialog {
      background-color: white;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: scaleIn 0.2s ease;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      padding: 16px 16px 0;
      position: relative;
    }
    
    .dialog-icon {
      color: var(--warning-color);
      margin-right: 8px;
    }
    
    .close-button {
      position: absolute;
      right: 12px;
      top: 12px;
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
    
    .close-button:hover {
      opacity: 1;
    }
    
    .dialog-content {
      padding: 16px;
    }
    
    .dialog-message {
      font-size: 16px;
      color: var(--gray-800);
      margin: 0;
      text-align: center;
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
      gap: 12px;
      border-top: 1px solid var(--gray-200);
    }
    
    .btn-cancel, .btn-confirm {
      border: none;
      border-radius: var(--border-radius);
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .btn-cancel {
      background-color: var(--gray-200);
      color: var(--gray-700);
    }
    
    .btn-cancel:hover {
      background-color: var(--gray-300);
    }
    
    .btn-confirm {
      background-color: var(--secondary-color);
      color: white;
    }
    
    .btn-confirm:hover {
      background-color: var(--secondary-dark);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.8); }
      to { transform: scale(1); }
    }
  `]
})
export class ConfirmDialogComponent implements OnInit {
  isOpen = false;
  message = '';
  confirmLabel = 'Aceptar';
  cancelLabel = 'Cancelar';
  onConfirm: (() => void) | null = null;
  onCancel: (() => void) | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.confirmDialog$.subscribe(dialog => {
      if (dialog) {
        this.isOpen = true;
        this.message = dialog.message;
        this.onConfirm = dialog.onConfirm;
        this.onCancel = dialog.onCancel || null;
        this.confirmLabel = dialog.confirmLabel || 'Aceptar';
        this.cancelLabel = dialog.cancelLabel || 'Cancelar';
      } else {
        this.isOpen = false;
      }
    });
  }

  handleConfirm(): void {
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.close();
  }

  handleCancel(): void {
    if (this.onCancel) {
      this.onCancel();
    }
    this.close();
  }

  handleOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.handleCancel();
    }
  }

  close(): void {
    this.notificationService.closeConfirmDialog();
  }
} 