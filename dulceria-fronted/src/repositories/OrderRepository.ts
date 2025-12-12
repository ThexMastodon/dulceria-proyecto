import { Order, OrderStatus } from '@/types/order';
import { IOrderRepository } from '@/interfaces/IOrderRepository';

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    warehouseId: '1',
    warehouseName: 'Almacén Principal Centro',
    branchId: '1',
    branchName: 'Sucursal Centro',
    clientId: 'client-1',
    clientName: 'María González',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Chocolate Ferrero Rocher',
        quantity: 10,
        unitPrice: 25.50,
        subtotal: 255.00,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Gomitas Haribo',
        quantity: 5,
        unitPrice: 15.00,
        subtotal: 75.00,
      },
    ],
    subtotal: 330.00,
    tax: 52.80,
    discount: 0,
    total: 382.80,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Tarjeta',
    notes: 'Cliente frecuente',
    createdBy: 'user-1',
    createdByName: 'Ana Ramírez',
    createdAt: '2024-12-10T10:30:00',
    completedAt: '2024-12-10T11:15:00',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    warehouseId: '1',
    warehouseName: 'Almacén Principal Centro',
    branchId: '1',
    branchName: 'Sucursal Centro',
    clientId: 'client-2',
    clientName: 'Carlos Mendoza',
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Paletas de Chocolate',
        quantity: 20,
        unitPrice: 8.50,
        subtotal: 170.00,
      },
    ],
    subtotal: 170.00,
    tax: 27.20,
    discount: 17.00,
    total: 180.20,
    status: 'processing',
    paymentStatus: 'pending',
    paymentMethod: 'Efectivo',
    notes: 'Pedido urgente',
    createdBy: 'user-2',
    createdByName: 'Luis Torres',
    createdAt: '2024-12-11T09:00:00',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    warehouseId: '2',
    warehouseName: 'Almacén Refrigerado Centro',
    branchId: '1',
    branchName: 'Sucursal Centro',
    clientId: 'client-3',
    clientName: 'Laura Martínez',
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Helado de Vainilla',
        quantity: 15,
        unitPrice: 35.00,
        subtotal: 525.00,
      },
      {
        id: 'item-5',
        productId: 'prod-5',
        productName: 'Helado de Fresa',
        quantity: 10,
        unitPrice: 35.00,
        subtotal: 350.00,
      },
    ],
    subtotal: 875.00,
    tax: 140.00,
    discount: 87.50,
    total: 927.50,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Transferencia',
    createdBy: 'user-1',
    createdByName: 'Ana Ramírez',
    createdAt: '2024-12-11T14:20:00',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    warehouseId: '1',
    warehouseName: 'Almacén Principal Centro',
    branchId: '1',
    branchName: 'Sucursal Centro',
    items: [
      {
        id: 'item-6',
        productId: 'prod-6',
        productName: 'Dulces Surtidos',
        quantity: 50,
        unitPrice: 5.00,
        subtotal: 250.00,
      },
    ],
    subtotal: 250.00,
    tax: 40.00,
    discount: 0,
    total: 290.00,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Efectivo',
    notes: 'Para evento escolar',
    createdBy: 'user-3',
    createdByName: 'Pedro Sánchez',
    createdAt: '2024-12-09T16:45:00',
    completedAt: '2024-12-09T17:30:00',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    warehouseId: '3',
    warehouseName: 'Almacén Norte',
    branchId: '2',
    branchName: 'Sucursal Norte',
    clientId: 'client-4',
    clientName: 'Roberto López',
    items: [
      {
        id: 'item-7',
        productId: 'prod-7',
        productName: 'Chocolate Kinder',
        quantity: 30,
        unitPrice: 12.00,
        subtotal: 360.00,
      },
    ],
    subtotal: 360.00,
    tax: 57.60,
    discount: 36.00,
    total: 381.60,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Tarjeta',
    notes: 'Cliente canceló por cambio de planes',
    createdBy: 'user-4',
    createdByName: 'Carmen Rivera',
    createdAt: '2024-12-08T11:00:00',
  },
];

class OrderRepository implements IOrderRepository {
  private orders: Order[] = INITIAL_ORDERS;
  private nextId = this.orders.length + 1;

  async getAll(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.orders]);
      }, 300);
    });
  }

  async getByWarehouseId(warehouseId: string): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.orders.filter(order => order.warehouseId === warehouseId);
        resolve([...filtered]);
      }, 300);
    });
  }

  async getById(id: string): Promise<Order | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === id);
        resolve(order || null);
      }, 200);
    });
  }

  async create(orderData: Omit<Order, 'id'>): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          ...orderData,
          id: String(this.nextId++),
          createdAt: new Date().toISOString(),
        };
        this.orders.push(newOrder);
        resolve(newOrder);
      }, 300);
    });
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
          reject(new Error('Order not found'));
          return;
        }

        const updatedOrder: Order = {
          ...this.orders[index],
          ...orderData,
          updatedAt: new Date().toISOString(),
        };

        this.orders[index] = updatedOrder;
        resolve(updatedOrder);
      }, 300);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
          reject(new Error('Order not found'));
          return;
        }

        this.orders.splice(index, 1);
        resolve();
      }, 300);
    });
  }
}

export const orderRepository = new OrderRepository();
