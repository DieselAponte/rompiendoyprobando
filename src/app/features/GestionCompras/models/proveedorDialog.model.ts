import { ProveedorDto } from './ProveedorDto';

/**
 * Datos de entrada para los Overlays de Proveedor (Creación/Edición)
 */
export interface ProveedorDialogData {
    mode: 'create' | 'edit';
    proveedor?: ProveedorDto; // Solo presente en modo 'edit'
}

/**
 * Resultado devuelto por el Overlay de Creación/Edición
 */
export interface ProveedorDialogResult {
    success: boolean;
    data?: ProveedorDto; // El proveedor creado o actualizado
}