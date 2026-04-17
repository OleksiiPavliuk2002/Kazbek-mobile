import { API_BASE } from '../constants';

export async function fetchMenu(type = '') {
  try {
    const url  = type ? `${API_BASE}/menu?type=${encodeURIComponent(type)}` : `${API_BASE}/menu`;
    const res  = await fetch(url);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function createBooking(payload) {
  const res  = await fetch(`${API_BASE}/bookings`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Помилка при бронюванні столу');
  return data;
}
