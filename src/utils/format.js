export function formatPrice(price) {
  return '$' + price.toFixed(2);
}

export function formatTime(time) {
  return new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function formatDateTime(time) {
  return new Date(time).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
