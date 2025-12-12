export interface Warehouse {
  id: string;
  name: string;
  code: string;
  branchId: string;
  branchName?: string;
  type: 'Principal' | 'Secundario' | 'Refrigerado' | 'Temporal';
  capacity: number;
  currentStock: number;
  manager: string;
  description: string;
  active: boolean;
  createdAt?: string;
}
