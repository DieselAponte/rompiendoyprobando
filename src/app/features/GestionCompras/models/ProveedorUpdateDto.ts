/**
 * DTO para actualizar un proveedor existente.
 */
export interface ProveedorUpdateDto {
	nombreProveedor?: string;
	direccion?: string;
	telefono?: string;
	correo?: string;
	estado?: boolean;
}
