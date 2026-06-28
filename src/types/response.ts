/**
 *
 * All API responses share the same structure.
 *
 * They all have a success, message and a data field.
 * Only data field's type changes from one endpoint to another.
 *
 * Therefore we can create a generic type for the data field.
 */

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}
