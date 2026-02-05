import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return `£${(price / 10).toFixed(1)}m`;
}

export function formatPoints(points: number): string {
  return points.toLocaleString();
}

export function getFormColor(form: number): 'green' | 'cyan' | 'amber' | 'magenta' {
  if (form >= 7) return 'green';
  if (form >= 5) return 'cyan';
  if (form >= 3) return 'amber';
  return 'magenta';
}

export function getPositionColor(position: string): string {
  const colors: Record<string, string> = {
    GK: '#00ff88',
    DEF: '#00d4ff',
    MID: '#ffb000',
    FWD: '#ff0066',
  };
  return colors[position] || '#ffffff';
}
