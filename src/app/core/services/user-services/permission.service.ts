import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation-data';
import { NavItem } from '../../models/nav-item.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  // 1. SIMULACIÓN DEL ROL DEL USUARIO
  // Usamos un Signal para que los componentes puedan reaccionar a los cambios de rol.
  // Rol inicial de prueba. Puedes cambiarlo a 'supervisor_comp', 'supervisor_', o 'DISTRIBUCION'.
  private userRole = signal<string>('supervisor_alm'); 
  /**
   * Expone el rol actual como una señal de solo lectura.
   * @returns Signal<string> con el rol actual.
   */
  getCurrentRole() {
    return this.userRole.asReadonly();
  }

  /**
   * Simula el proceso de login, asignando un nuevo rol.
   * (Esta función será llamada por un AuthService real más adelante).
   * @param role El nuevo rol a asignar.
   */
  setRole(role: string): void {
    this.userRole.set(role);
    console.log(`Rol cambiado a: ${role}`);
  }

  /**
   * Verifica si el rol del usuario actual tiene acceso al rol requerido por el módulo.
   * @param requiredRole El rol requerido por el NavItem.
   * @returns true si el usuario tiene acceso o si no se requiere rol.
   */
  hasAccess(requiredRole: string | undefined): boolean {
    // Si el ítem no requiere un rol específico, es visible (true).
    if (!requiredRole) {
      return true;
    }
    
    // Si el rol del usuario coincide con el rol requerido, es visible.
    return this.userRole() === requiredRole;
  }

  /**
   * Filtra la lista completa de ítems de navegación según el rol del usuario actual.
   * @returns Array de NavItem visibles para el usuario.
   */
  getFilteredNavItems(): NavItem[] {
    const role = this.userRole();
    
    // Filtramos los módulos principales
    return SIDEBAR_NAV_ITEMS.filter(module => {
      // 1. Si el módulo tiene un children, debe ser un módulo y lo filtramos por su rol.
      if (module.children && module.requiredRole) {
        return this.hasAccess(module.requiredRole);
      }
      
      // En este diseño, todos los ítems de primer nivel (módulos) requieren un rol.
      return false; 
    });
  }
}
