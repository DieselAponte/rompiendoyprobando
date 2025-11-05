import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation-data';
import { NavItem } from '../../models/nav-item.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  
  // 'supervisor_comp', 'supervisor_dist', 'supervisor_alm', 'supervisor_prog'
  private userRole = signal<string>('supervisor_alm'); 

  getCurrentRole() {
    return this.userRole.asReadonly();
  }

  setRole(role: string): void {
    this.userRole.set(role);
  }

  hasAccess(requiredRole: string | undefined): boolean {
    // Si el ítem no requiere un rol específico, es visible (true).
    if (!requiredRole) {
      return true;
    }
    
    // Si el rol del usuario coincide con el rol requerido, es visible.
    return this.userRole() === requiredRole;
  }

  
  getFilteredNavItems(): NavItem[] {
    const role = this.userRole();
    
    
    return SIDEBAR_NAV_ITEMS.filter(module => {
      // 1. Si el módulo tiene un children, debe ser un módulo y lo filtramos por su rol.
      if (module.children && module.requiredRole) {
        return this.hasAccess(module.requiredRole);
      }
      
      
      return false; 
    });
  }
}
