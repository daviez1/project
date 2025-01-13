import type { Error } from "$lib/types/errors";

export const stockInvalid: Error = { message: 'El stock máximo debe ser mayor que el stock mínimo.', activate: false }
export const productExist: Error = { message: 'El producto ya existe en el inventario.', option: 'Podría aumentar la cantidad de su stock', activate: false }
