export type InventoryMovementType = 'entry' | 'exit' | 'adjustment' | 'transfer';
export type InventoryStatus = 'available' | 'reserved' | 'damaged' | 'expired';

export interface InventoryItem {
  id: string;
  warehouseId: string;
  warehouseName: string;
  productId: string;
  productName: string;
  productCode: string;
  productImage?: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  status: InventoryStatus;
  lastRestockDate?: string;
  expirationDate?: string;
  batchNumber?: string;
  unitCost: number;
  totalValue: number;
  updatedAt: string;
}

export interface InventoryMovement {
  id: string;
  warehouseId: string;
  warehouseName: string;
  productId: string;
  productName: string;
  productCode: string;
  type: InventoryMovementType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  referenceDocument?: string;
  destinationWarehouseId?: string;
  destinationWarehouseName?: string;
  performedBy: string;
  performedByName: string;
  notes?: string;
  createdAt: string;
}

export interface InventoryAlert {
  id: string;
  warehouseId: string;
  warehouseName: string;
  productId: string;
  productName: string;
  currentQuantity: number;
  minStock: number;
  alertType: 'low-stock' | 'out-of-stock' | 'overstock' | 'expiring-soon' | 'expired';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  expirationDate?: string;
  acknowledged: boolean;
  createdAt: string;
}
