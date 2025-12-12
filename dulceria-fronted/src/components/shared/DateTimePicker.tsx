"use client";

import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function pad(n: number) { return n.toString().padStart(2, '0'); }
function toLocalISO(dt: Date) {
  const y = dt.getFullYear();
  const m = pad(dt.getMonth() + 1);
  const d = pad(dt.getDate());
  const hh = pad(dt.getHours());
  const mm = pad(dt.getMinutes());
  return `${y}-${m}-${d}T${hh}:${mm}`;
}

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MONTHS_ABBR = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const WEEKDAYS = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

export interface DateTimePickerProps {
  value?: string; // ISO local string YYYY-MM-DDTHH:mm
  onChange: (value: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const initial = useMemo(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    const now = new Date();
    now.setSeconds(0,0);
    return now;
  }, [value]);

  const [viewMonth, setViewMonth] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [selected, setSelected] = useState<Date>(initial);

  const startDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 0).getDate();

  const hours = Array.from({length:24}, (_,i)=>pad(i));
  const minutes = Array.from({length:12}, (_,i)=>pad(i*5));

  const setDatePart = (d: number) => {
    const next = new Date(selected);
    next.setFullYear(viewMonth.getFullYear());
    next.setMonth(viewMonth.getMonth());
    next.setDate(d);
    setSelected(next);
    onChange(toLocalISO(next));
  };

  const setHour = (h: string) => {
    const next = new Date(selected);
    next.setHours(Number(h));
    setSelected(next);
    onChange(toLocalISO(next));
  };

  const setMinute = (m: string) => {
    const next = new Date(selected);
    next.setMinutes(Number(m));
    setSelected(next);
    onChange(toLocalISO(next));
  };

  const goPrevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()-1, 1));
  const goNextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 1));
  const goToday = () => {
    const now = new Date();
    now.setSeconds(0,0);
    setViewMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelected(now);
    onChange(toLocalISO(now));
  };

  const selectedDay = selected.getFullYear()===viewMonth.getFullYear() && selected.getMonth()===viewMonth.getMonth() ? selected.getDate() : null;
  const today = new Date();
  const isToday = (d:number) => d===today.getDate() && viewMonth.getMonth()===today.getMonth() && viewMonth.getFullYear()===today.getFullYear();

  // Years selector range (+/- 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 21}, (_,i)=> String(currentYear - 10 + i));

  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={goPrevMonth} aria-label="Mes anterior">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Select value={MONTHS_ABBR[viewMonth.getMonth()]} onValueChange={(abbr)=>{
            const idx = MONTHS_ABBR.indexOf(abbr);
            setViewMonth(new Date(viewMonth.getFullYear(), idx, 1));
          }}>
            <SelectTrigger className="h-8 w-[84px] capitalize">
              <SelectValue placeholder={MONTHS_ABBR[viewMonth.getMonth()]} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {MONTHS_ABBR.map((m)=> (
                <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(viewMonth.getFullYear())} onValueChange={(y)=>{
            setViewMonth(new Date(Number(y), viewMonth.getMonth(), 1));
          }}>
            <SelectTrigger className="h-8 w-[86px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={goNextMonth} aria-label="Mes siguiente">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-zinc-500 mb-1">
        {WEEKDAYS.map(d => (<div key={d} className="py-1">{d}</div>))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({length: startDay}).map((_,i)=> (
          <div key={`e-${i}`} className="py-2 text-sm text-transparent">00</div>
        ))}
        {Array.from({length: daysInMonth}).map((_,i)=> {
          const day = i+1;
          const isSel = selectedDay === day;
          const todayClass = isToday(day) ? 'ring-1 ring-pink-500' : '';
          return (
            <button
              key={day}
              type="button"
              onClick={()=>setDatePart(day)}
              className={`h-9 w-9 mx-auto flex items-center justify-center rounded-md text-sm transition-colors ${isSel ? 'bg-pink-600 text-white' : 'hover:bg-pink-50 text-zinc-700'} ${todayClass}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Clock className="h-4 w-4 text-zinc-500" />
        <div className="flex items-center gap-2">
          <Select value={pad(selected.getHours())} onValueChange={setHour}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {hours.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="text-zinc-400">:</span>
          <Select value={pad(Math.floor(selected.getMinutes()/5)*5)} onValueChange={setMinute}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {minutes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto">
          <Button type="button" variant="outline" size="sm" onClick={goToday}>Hoy</Button>
        </div>
      </div>
    </div>
  );
}
