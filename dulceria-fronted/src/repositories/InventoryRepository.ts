import { InventoryItem, InventoryMovement, InventoryAlert } from '@/types/inventory';

class InventoryRepository {
  private inventoryItems: InventoryItem[] = [
    {
      id: '1',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '1',
      productName: 'Chocolate Ferrero Rocher',
      productCode: 'CHOC-001',
      productImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200',
      quantity: 450,
      minStock: 100,
      maxStock: 1000,
      location: 'A-12-3',
      status: 'available',
      lastRestockDate: '2025-12-05',
      expirationDate: '2026-06-15',
      batchNumber: 'BATCH-2025-001',
      unitCost: 25.50,
      totalValue: 11475,
      updatedAt: '2025-12-05T10:30:00Z',
    },
    {
      id: '2',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '2',
      productName: 'Gomitas Haribo',
      productCode: 'GOM-001',
      productImage: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=200',
      quantity: 85,
      minStock: 150,
      maxStock: 800,
      location: 'B-05-1',
      status: 'available',
      lastRestockDate: '2025-12-01',
      expirationDate: '2026-12-31',
      batchNumber: 'BATCH-2025-002',
      unitCost: 12.00,
      totalValue: 1020,
      updatedAt: '2025-12-01T14:20:00Z',
    },
    {
      id: '3',
      warehouseId: '2',
      warehouseName: 'Almacén Refrigerado',
      productId: '3',
      productName: 'Paletas Magnum',
      productCode: 'PAL-001',
      productImage: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=200',
      quantity: 220,
      minStock: 100,
      maxStock: 500,
      location: 'R-01-2',
      status: 'available',
      lastRestockDate: '2025-12-08',
      expirationDate: '2026-03-15',
      batchNumber: 'BATCH-2025-003',
      unitCost: 18.00,
      totalValue: 3960,
      updatedAt: '2025-12-08T09:15:00Z',
    },
    {
      id: '4',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '4',
      productName: 'Chicles Trident',
      productCode: 'CHI-001',
      quantity: 15,
      minStock: 100,
      maxStock: 600,
      location: 'C-08-4',
      status: 'available',
      lastRestockDate: '2025-11-20',
      expirationDate: '2027-01-31',
      batchNumber: 'BATCH-2024-045',
      unitCost: 8.50,
      totalValue: 127.50,
      updatedAt: '2025-11-20T16:45:00Z',
    },
  ];

  private movements: InventoryMovement[] = [
    {
      id: '1',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '1',
      productName: 'Chocolate Ferrero Rocher',
      productCode: 'CHOC-001',
      type: 'entry',
      quantity: 200,
      previousQuantity: 250,
      newQuantity: 450,
      reason: 'Reabastecimiento programado',
      referenceDocument: 'PO-2025-123',
      performedBy: 'user-1',
      performedByName: 'Juan Pérez',
      notes: 'Recibido de proveedor XYZ',
      createdAt: '2025-12-05T10:30:00Z',
    },
  ];

  private alerts: InventoryAlert[] = [
    {
      id: '1',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '2',
      productName: 'Gomitas Haribo',
      currentQuantity: 85,
      minStock: 150,
      alertType: 'low-stock',
      severity: 'medium',
      message: 'Stock por debajo del mínimo requerido',
      acknowledged: false,
      createdAt: '2025-12-08T14:15:00Z',
    },
    {
      id: '2',
      warehouseId: '1',
      warehouseName: 'Almacén Central',
      productId: '4',
      productName: 'Chicles Trident',
      currentQuantity: 15,
      minStock: 100,
      alertType: 'low-stock',
      severity: 'critical',
      message: 'Stock crítico - requiere reabastecimiento urgente',
      acknowledged: false,
      createdAt: '2025-12-09T09:20:00Z',
    },
  ];

  async getInventoryItems(warehouseId?: string): Promise<InventoryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (warehouseId) {
      return this.inventoryItems.filter(item => item.warehouseId === warehouseId);
    }
    return [...this.inventoryItems];
  }

  async updateInventoryItem(id: string, data: Partial<InventoryItem>): Promise<InventoryItem> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.inventoryItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.inventoryItems[index] = {
        ...this.inventoryItems[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      if (data.quantity !== undefined || data.unitCost !== undefined) {
        this.inventoryItems[index].totalValue = 
          this.inventoryItems[index].quantity * this.inventoryItems[index].unitCost;
      }
      
      return this.inventoryItems[index];
    }
    throw new Error('Inventory item not found');
  }

  async getMovements(warehouseId?: string, productId?: string): Promise<InventoryMovement[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    let result = [...this.movements];
    
    if (warehouseId) {
      result = result.filter(m => m.warehouseId === warehouseId);
    }
    
    if (productId) {
      result = result.filter(m => m.productId === productId);
    }
    
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createMovement(movement: Omit<InventoryMovement, 'id'>): Promise<InventoryMovement> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newMovement: InventoryMovement = {
      ...movement,
      id: `mov-${Date.now()}`,
    };
    this.movements.unshift(newMovement);
    
    const inventoryItem = this.inventoryItems.find(
      item => item.productId === movement.productId && item.warehouseId === movement.warehouseId
    );
    
    if (inventoryItem) {
      await this.updateInventoryItem(inventoryItem.id, {
        quantity: movement.newQuantity,
      });
    }
    
    return newMovement;
  }

  async getAlerts(warehouseId?: string): Promise<InventoryAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    if (warehouseId) {
      return this.alerts.filter(alert => alert.warehouseId === warehouseId);
    }
    return [...this.alerts].sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }

  async acknowledgeAlert(id: string): Promise<InventoryAlert> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.alerts.findIndex(alert => alert.id === id);
    if (index !== -1) {
      this.alerts[index].acknowledged = true;
      return this.alerts[index];
    }
    throw new Error('Alert not found');
  }
}

export const inventoryRepository = new InventoryRepository();
