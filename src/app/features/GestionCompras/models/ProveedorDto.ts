/**
 * DTO de lectura para proveedores.
 */
export interface ProveedorDto {
    id: number;
    nombreProveedor: string;
    ruc: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    estado?: boolean;
}