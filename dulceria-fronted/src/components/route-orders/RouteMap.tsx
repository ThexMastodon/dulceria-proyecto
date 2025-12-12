"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { RouteOrder } from '@/types/routeOrder';
import { Icon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';

interface RouteMapProps {
  orders: RouteOrder[];
  onOrderClick?: (order: RouteOrder) => void;
}

// Fix para los iconos de Leaflet en Next.js
const createIcon = (color: string) => {
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const iconColors = {
  pending: 'yellow',
  confirmed: 'blue',
  delivered: 'green',
  rejected: 'red',
  rescheduled: 'orange',
};

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  delivered: 'Entregado',
  rejected: 'Rechazado',
  rescheduled: 'Reagendado',
};

// Componente para ajustar automáticamente el zoom del mapa
function MapBounds({ orders }: { orders: RouteOrder[] }) {
  const map = useMap();

  useEffect(() => {
    if (orders.length > 0) {
      const validOrders = orders.filter(order => order.lat && order.lng);
      
      if (validOrders.length > 0) {
        const bounds = new LatLngBounds(
          validOrders.map(order => [order.lat!, order.lng!])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [orders, map]);

  return null;
}

export function RouteMap({ orders, onOrderClick }: RouteMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-zinc-100 rounded-lg flex items-center justify-center">
        <p className="text-zinc-500">Cargando mapa...</p>
      </div>
    );
  }

  const validOrders = orders.filter(order => order.lat && order.lng);
  
  // Centro por defecto (Ciudad de México)
  const center: [number, number] = validOrders.length > 0
    ? [validOrders[0].lat!, validOrders[0].lng!]
    : [19.4326, -99.1332];

  // Crear las líneas de la ruta conectando los puntos en orden
  const routePoints: [number, number][] = validOrders
    .filter(order => order.status !== 'rejected')
    .map(order => [order.lat!, order.lng!]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-zinc-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds orders={validOrders} />

        {/* Línea de la ruta */}
        {routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            color="#3b82f6"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}

        {/* Marcadores para cada pedido */}
        {validOrders.map((order, index) => (
          <Marker
            key={order.id}
            position={[order.lat!, order.lng!]}
            icon={createIcon(iconColors[order.status])}
            eventHandlers={{
              click: () => {
                if (onOrderClick) {
                  onOrderClick(order);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">{order.orderNumber}</h3>
                  <Badge variant={order.status === 'delivered' ? 'secondary' : 'default'}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-xs">
                  <p className="font-medium text-zinc-900">{order.customerName}</p>
                  <p className="text-zinc-600">{order.customerAddress}</p>
                  <p className="text-zinc-500">{order.customerPhone}</p>
                  
                  <div className="border-t border-zinc-200 pt-2 mt-2">
                    <p className="text-zinc-600">
                      {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                    </p>
                    <p className="font-bold text-zinc-900">
                      Total: {formatCurrency(order.total)}
                    </p>
                  </div>

                  {order.deliveryTime && (
                    <p className="text-zinc-500 text-xs">
                      Hora: {order.deliveryTime}
                    </p>
                  )}

                  {order.notes && (
                    <p className="text-zinc-500 italic mt-1">
                      {order.notes}
                    </p>
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-zinc-200">
                  <p className="text-xs text-zinc-500">
                    Parada #{index + 1} de {validOrders.length}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
