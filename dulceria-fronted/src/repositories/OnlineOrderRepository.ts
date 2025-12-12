import { OnlineOrder, OnlineOrderStatus } from '@/types/onlineOrder';
import { IOnlineOrderRepository } from '@/interfaces/IOnlineOrderRepository';

const INITIAL_ORDERS: OnlineOrder[] = [
  {
    id: '1',
    orderNumber: 'WEB-2024-001',
    customerId: 'cust-1',
    customerName: 'Andrea Flores',
    customerEmail: 'andrea.flores@email.com',
    customerPhone: '55-1234-5678',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Chocolate Ferrero Rocher 24 pzas',
        quantity: 2,
        unitPrice: 425.00,
        subtotal: 850.00,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Gomitas Haribo 1kg',
        quantity: 1,
        unitPrice: 180.00,
        subtotal: 180.00,
      },
    ],
    subtotal: 1030.00,
    tax: 164.80,
    shippingCost: 80.00,
    discount: 0,
    total: 1274.80,
    status: 'new',
    deliveryType: 'delivery',
    deliveryAddress: {
      street: 'Av. Reforma',
      number: '456',
      neighborhood: 'Polanco',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '11560',
      references: 'Torre B, Piso 3',
    },
    paymentMethod: 'Tarjeta',
    paymentStatus: 'paid',
    notes: 'Entregar antes de las 5pm',
    createdAt: '2024-12-11T08:30:00',
  },
  {
    id: '2',
    orderNumber: 'WEB-2024-002',
    customerId: 'cust-2',
    customerName: 'Roberto Sánchez',
    customerEmail: 'roberto.s@email.com',
    customerPhone: '55-9876-5432',
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Paletas Artesanales Surtidas 50 pzas',
        quantity: 1,
        unitPrice: 650.00,
        subtotal: 650.00,
      },
    ],
    subtotal: 650.00,
    tax: 104.00,
    shippingCost: 0,
    discount: 65.00,
    total: 689.00,
    status: 'confirmed',
    deliveryType: 'pickup',
    pickupBranchId: '1',
    pickupBranchName: 'Sucursal Centro',
    paymentMethod: 'Transferencia',
    paymentStatus: 'paid',
    notes: 'Recogerá el viernes',
    createdAt: '2024-12-11T09:15:00',
    confirmedAt: '2024-12-11T09:30:00',
  },
  {
    id: '3',
    orderNumber: 'WEB-2024-003',
    customerId: 'cust-3',
    customerName: 'Diana Morales',
    customerEmail: 'diana.m@email.com',
    customerPhone: '55-4567-8901',
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Dulces Mexicanos Mix 2kg',
        quantity: 3,
        unitPrice: 320.00,
        subtotal: 960.00,
      },
      {
        id: 'item-5',
        productId: 'prod-5',
        productName: 'Chocolate Kinder Bueno 43g',
        quantity: 10,
        unitPrice: 25.00,
        subtotal: 250.00,
      },
    ],
    subtotal: 1210.00,
    tax: 193.60,
    shippingCost: 100.00,
    discount: 121.00,
    total: 1382.60,
    status: 'preparing',
    deliveryType: 'delivery',
    deliveryAddress: {
      street: 'Insurgentes Sur',
      number: '2345',
      neighborhood: 'Del Valle',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '03100',
    },
    assignedTo: 'delivery-1',
    assignedToName: 'Juan Pérez',
    paymentMethod: 'Efectivo',
    paymentStatus: 'pending',
    createdAt: '2024-12-11T10:00:00',
    confirmedAt: '2024-12-11T10:15:00',
  },
  {
    id: '4',
    orderNumber: 'WEB-2024-004',
    customerId: 'cust-4',
    customerName: 'Carlos Ramírez',
    customerEmail: 'carlos.r@email.com',
    customerPhone: '55-2345-6789',
    items: [
      {
        id: 'item-6',
        productId: 'prod-6',
        productName: 'Helado Premium Chocolate 1L',
        quantity: 4,
        unitPrice: 180.00,
        subtotal: 720.00,
      },
    ],
    subtotal: 720.00,
    tax: 115.20,
    shippingCost: 80.00,
    discount: 0,
    total: 915.20,
    status: 'shipped',
    deliveryType: 'delivery',
    deliveryAddress: {
      street: 'Periférico Sur',
      number: '7890',
      neighborhood: 'Jardines del Pedregal',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '04500',
      references: 'Casa blanca con portón negro',
    },
    assignedTo: 'delivery-2',
    assignedToName: 'María González',
    paymentMethod: 'Tarjeta',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T15:00:00',
    confirmedAt: '2024-12-10T15:30:00',
    shippedAt: '2024-12-11T09:00:00',
  },
  {
    id: '5',
    orderNumber: 'WEB-2024-005',
    customerId: 'cust-5',
    customerName: 'Lucía Hernández',
    customerEmail: 'lucia.h@email.com',
    customerPhone: '55-8765-4321',
    items: [
      {
        id: 'item-7',
        productId: 'prod-7',
        productName: 'Chocolates Lindt Assorted 500g',
        quantity: 2,
        unitPrice: 450.00,
        subtotal: 900.00,
      },
    ],
    subtotal: 900.00,
    tax: 144.00,
    shippingCost: 80.00,
    discount: 90.00,
    total: 1034.00,
    status: 'delivered',
    deliveryType: 'delivery',
    deliveryAddress: {
      street: 'Av. Universidad',
      number: '1234',
      neighborhood: 'Coyoacán',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '04000',
    },
    assignedTo: 'delivery-1',
    assignedToName: 'Juan Pérez',
    paymentMethod: 'Tarjeta',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T11:00:00',
    confirmedAt: '2024-12-10T11:30:00',
    shippedAt: '2024-12-10T14:00:00',
    deliveredAt: '2024-12-10T16:30:00',
  },
];

class OnlineOrderRepository implements IOnlineOrderRepository {
  private orders: OnlineOrder[] = INITIAL_ORDERS;
  private nextId = this.orders.length + 1;

  async getAll(): Promise<OnlineOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.orders]);
      }, 300);
    });
  }

  async getByStatus(status: string): Promise<OnlineOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.orders.filter(order => order.status === status);
        resolve([...filtered]);
      }, 300);
    });
  }

  async getById(id: string): Promise<OnlineOrder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === id);
        resolve(order || null);
      }, 200);
    });
  }

  async create(orderData: Omit<OnlineOrder, 'id'>): Promise<OnlineOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: OnlineOrder = {
          ...orderData,
          id: String(this.nextId++),
          createdAt: new Date().toISOString(),
        };
        this.orders.push(newOrder);
        resolve(newOrder);
      }, 300);
    });
  }

  async update(id: string, orderData: Partial<OnlineOrder>): Promise<OnlineOrder> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
          reject(new Error('Order not found'));
          return;
        }

        const updatedOrder: OnlineOrder = {
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

export const onlineOrderRepository = new OnlineOrderRepository();
