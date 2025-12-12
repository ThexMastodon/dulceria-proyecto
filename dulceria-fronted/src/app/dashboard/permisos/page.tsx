import { PermissionsView } from '@/components/permissions/PermissionsView';

export default function PermissionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Permisos</h1>
        <p className="text-zinc-600 mt-1">Gestiona los permisos del sistema</p>
      </div>
      <PermissionsView />
    </div>
  );
}
