import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { 
  Calendar, Plus, MapPin, Eye, Pencil, Trash, User, Users, Save, ArrowLeft, NotebookTabs,
  CheckCircle, AlertCircle, AlertTriangle, Info, X, TableOfContents, UserPlus, Search
} from 'lucide-angular';

import { routes } from './app.routes';

// Crear un provider con todos los iconos que utilizamos
const icons = { 
  Calendar, Plus, MapPin, Eye, Pencil, Trash, User, Users, Save, ArrowLeft, NotebookTabs,
  CheckCircle, AlertCircle, AlertTriangle, Info, X, TableOfContents, UserPlus, Search
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    // Registrar todos los iconos para que estén disponibles en la aplicación
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons), multi: true }
  ]
};
