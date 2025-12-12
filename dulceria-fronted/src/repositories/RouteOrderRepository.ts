import { RouteOrder, RouteOrderStatus } from '@/types/routeOrder';
import { IRouteOrderRepository } from '@/interfaces/IRouteOrderRepository';

const INITIAL_ORDERS: RouteOrder[] = [
  {
    id: '1',
    orderNumber: 'RUT-2024-001',
    routeId: 'route-1',
    routeName: 'Ruta Norte - Zona 1',
    deliveryPersonId: 'delivery-1',
    deliveryPersonName: 'Juan Pérez',
    customerId: 'rc-1',
    customerName: 'Tienda La Esquina',
    customerPhone: '55-1111-2222',
    customerAddress: 'Av. Insurgentes Norte 123, Col. Lindavista',
    lat: 19.4872,
    lng: -99.1192,
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Chocolate Carlos V 50g',
        quantity: 24,
        unitPrice: 12.50,
        subtotal: 300.00,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Gomitas Ricolino 100g',
        quantity: 30,
        unitPrice: 8.00,
        subtotal: 240.00,
      },
    ],
    subtotal: 540.00,
    tax: 86.40,
    discount: 54.00,
    total: 572.40,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    deliveryDate: '2024-12-11',
    notes: 'Llamar antes de llegar',
    createdAt: '2024-12-11T08:00:00',
  },
  {
    id: '2',
    orderNumber: 'RUT-2024-002',
    routeId: 'route-1',
    routeName: 'Ruta Norte - Zona 1',
    deliveryPersonId: 'delivery-1',
    deliveryPersonName: 'Juan Pérez',
    customerId: 'rc-2',
    customerName: 'Abarrotes Don José',
    customerPhone: '55-2222-3333',
    customerAddress: 'Calzada Vallejo 456, Col. Nueva Atzacoalco',
    lat: 19.5024,
    lng: -99.1267,
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Paletas Payaso 10 pzas',
        quantity: 15,
        unitPrice: 35.00,
        subtotal: 525.00,
      },
    ],
    subtotal: 525.00,
    tax: 84.00,
    discount: 0,
    total: 609.00,
    status: 'confirmed',
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    deliveryDate: '2024-12-11',
    deliveryTime: '10:00',
    createdAt: '2024-12-11T07:30:00',
  },
  {
    id: '3',
    orderNumber: 'RUT-2024-003',
    routeId: 'route-2',
    routeName: 'Ruta Sur - Zona 2',
    deliveryPersonId: 'delivery-2',
    deliveryPersonName: 'María González',
    customerId: 'rc-3',
    customerName: 'Miscelánea El Punto',
    lat: 19.3698,
    lng: -99.1559,
    customerPhone: '55-3333-4444',
    customerAddress: 'Calzada de Tlalpan 789, Col. Portales',
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Chicles Trident 12 pzas',
        quantity: 40,
        unitPrice: 6.50,
        subtotal: 260.00,
      },
      {
        id: 'item-5',
        productId: 'prod-5',
        productName: 'Chocolates M&M 45g',
        quantity: 20,
        unitPrice: 15.00,
        subtotal: 300.00,
      },
    ],
    subtotal: 560.00,
    tax: 89.60,
    discount: 56.00,
    total: 593.60,
    status: 'delivered',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    deliveryDate: '2024-12-11',
    deliveryTime: '11:30',
    createdAt: '2024-12-11T06:45:00',
    deliveredAt: '2024-12-11T11:45:00',
  },
  {
    id: '4',
    orderNumber: 'RUT-2024-004',
    routeId: 'route-2',
    routeName: 'Ruta Sur - Zona 2',
    deliveryPersonId: 'delivery-2',
    deliveryPersonName: 'María González',
    customerId: 'rc-4',
    customerName: 'Tiendita Lupita',
    lat: 19.3832,
    lng: -99.1651,
    customerPhone: '55-4444-5555',
    customerAddress: 'Av. División del Norte 321, Col. Del Valle',
    items: [
      {
        id: 'item-6',
        productId: 'prod-6',
        productName: 'Dulces Vero Mango 100 pzas',
        quantity: 3,
        unitPrice: 120.00,
        subtotal: 360.00,
      },
    ],
    subtotal: 360.00,
    tax: 57.60,
    discount: 0,
    total: 417.60,
    status: 'pending',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    deliveryDate: '2024-12-12',
    notes: 'Entrega de tarde después de las 2pm',
    createdAt: '2024-12-11T09:00:00',
  },
  {
    id: '5',
    orderNumber: 'RUT-2024-005',
    routeId: 'route-3',
    routeName: 'Ruta Centro - Zona 3',
    deliveryPersonId: 'delivery-3',
    deliveryPersonName: 'Carlos López',
    lat: 19.4326,
    lng: -99.1332,
    customerId: 'rc-5',
    customerName: 'Comercial El Buen Precio',
    customerPhone: '55-5555-6666',
    customerAddress: 'Eje Central 654, Col. Centro',
    items: [
      {
        id: 'item-7',
        productId: 'prod-7',
        productName: 'Botanas Sabritas Mix 50g',
        quantity: 48,
        unitPrice: 10.00,
        subtotal: 480.00,
      },
      {
        id: 'item-8',
        productId: 'prod-8',
        productName: 'Galletas Gamesa Surtidas',
        quantity: 24,
        unitPrice: 18.00,
        subtotal: 432.00,
      },
    ],
    subtotal: 912.00,
    tax: 145.92,
    discount: 91.20,
    total: 966.72,
    status: 'rejected',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    deliveryDate: '2024-12-11',
    rejectionReason: 'Cliente cerrado temporalmente',
    createdAt: '2024-12-11T07:00:00',
  },
];

class RouteOrderRepository implements IRouteOrderRepository {
  private orders: RouteOrder[] = INITIAL_ORDERS;
  private nextId = this.orders.length + 1;

  async getAll(): Promise<RouteOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.orders]);
      }, 300);
    });
  }

  async getByRouteId(routeId: string): Promise<RouteOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.orders.filter(order => order.routeId === routeId);
        resolve([...filtered]);
      }, 300);
    });
  }

  async getByDeliveryPerson(deliveryPersonId: string): Promise<RouteOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.orders.filter(order => order.deliveryPersonId === deliveryPersonId);
        resolve([...filtered]);
      }, 300);
    });
  }

  async getById(id: string): Promise<RouteOrder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === id);
        resolve(order || null);
      }, 200);
    });
  }

  async create(orderData: Omit<RouteOrder, 'id'>): Promise<RouteOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: RouteOrder = {
          ...orderData,
          id: String(this.nextId++),
          createdAt: new Date().toISOString(),
        };
        this.orders.push(newOrder);
        resolve(newOrder);
      }, 300);
    });
  }

  async update(id: string, orderData: Partial<RouteOrder>): Promise<RouteOrder> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
          reject(new Error('Order not found'));
          return;
        }

        const updatedOrder: RouteOrder = {
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

export const routeOrderRepository = new RouteOrderRepository();
