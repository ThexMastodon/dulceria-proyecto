export type MovementType = 'Entrada' | 'Salida';

export interface Movement {
  id: string;
  date: string; // ISO date
  type: MovementType;
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  unit: string; // pza, kg, etc
  reference?: string; // order id, doc folio
  notes?: string;
  createdBy?: string;
}
