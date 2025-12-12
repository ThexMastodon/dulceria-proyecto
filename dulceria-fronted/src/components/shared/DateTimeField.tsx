"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DateTimePicker } from './DateTimePicker';

function formatHuman(value?: string) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

export interface DateTimeFieldProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DateTimeField({ value, onChange, placeholder = 'Selecciona fecha' }: DateTimeFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const display = useMemo(() => formatHuman(value), [value]);

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Input
          readOnly
          value={display}
          placeholder={placeholder}
          onClick={() => setOpen(v => !v)}
          className="pr-9 cursor-pointer"
        />
        <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
      </div>
      {open && (
        <div className="absolute z-50 mt-2 w-[320px] rounded-xl border border-zinc-200 bg-white shadow-lg p-2">
          <DateTimePicker value={value} onChange={(v)=>{ onChange(v); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}
