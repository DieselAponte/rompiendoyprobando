/**
 * DTO para registrar un proveedor.
 */
export interface ProveedorCreateDto {
  nombreProveedor: string;
  ruc: string;
  direccion: string;
  telefono: string;
  correo: string;
}