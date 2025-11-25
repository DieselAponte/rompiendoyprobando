import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComprasApiService } from '../api/compras-api.service';
import { ProveedorDto } from '../models/ProveedorDto';
import { ProveedorCreateDto } from '../models/ProveedorCreateDto';
import { ProveedorUpdateDto } from '../models/ProveedorUpdateDto';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private readonly api: ComprasApiService) {}

  /**
   * Obtiene la lista completa de proveedores para la tabla.
   * Usado en: ListaProveedoresComponent
   */
  getListadoProveedores(): Observable<ProveedorDto[]> {
    return this.api
      .listarProveedores()
      .pipe(catchError(() => of([])));
  }

  /**
   * Crea un nuevo proveedor en el sistema.
   * Usado en: PopupProveedorFormComponent (modo create)
   */
  createProveedor(payload: ProveedorCreateDto): Observable<ProveedorDto> {
    return this.api.registrarProveedor(payload);
  }

  /**
   * Actualiza los datos de un proveedor existente.
   * Usado en: PopupProveedorFormComponent (modo edit)
   */
  updateProveedor(id: number, payload: ProveedorUpdateDto): Observable<ProveedorDto> {
    return this.api.actualizarProveedor(id, payload);
  }

  /**
   * Elimina lógicamente (o físicamente) un proveedor.
   * Usado en: PopupConfirmacionEliminacionComponent
   */
  deleteProveedor(id: number): Observable<void> {
    return this.api.eliminarProveedor(id);
  }
  
}
