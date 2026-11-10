/**
 * Orders are saved in localStorage so the tracking page still works after
 * a refresh. There is no real backend: the status is worked out from the
 * time that has passed since the order was placed.
 */

const STORAGE_KEY = 'ember-orders';

/** `at` = seconds after checkout when each stage starts (short for the demo). */
export const STAGES = [
  { key: 'received', label: 'Received', description: 'We got your order and sent it to the kitchen.', at: 0 },
  { key: 'preparing', label: 'Preparing', description: 'Our cooks are making your food.', at: 10 },
  { key: 'on-the-way', label: 'On the way', description: 'A rider has picked up your order.', at: 25 },
  { key: 'delivered', label: 'Delivered', description: 'Your food has arrived. Enjoy!', at: 45 },
];

export const TOTAL_SECONDS = 45;

// Get all saved orders from the browser (an empty list if there are none yet)
function readOrders() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(saved)) {
    return saved;
  }
  return [];
}

export function createOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return 'EB-' + id;
}

export function saveOrder(order) {
  const orders = readOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrder(id) {
  return readOrders().find((order) => order.id === id.toUpperCase());
}

/**
 * Works out which stage an order is in.
 * `percent` is how far along the progress bar should be (0–100).
 */
export function getProgress(createdAt, now) {
  const elapsed = (now - createdAt) / 1000; // seconds since the order was placed

  let index = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (elapsed >= STAGES[i].at) index = i;
  }

  const last = STAGES.length - 1;
  let percent = 100;
  if (index < last) {
    // how far we are between this stage and the next one
    const start = STAGES[index].at;
    const end = STAGES[index + 1].at;
    const between = (elapsed - start) / (end - start);
    percent = ((index + between) / last) * 100;
  }

  return {
    index,
    stage: STAGES[index],
    percent,
    done: index === last,
    secondsLeft: Math.max(0, Math.ceil(TOTAL_SECONDS - elapsed)),
  };
}
