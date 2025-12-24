import { CartItem } from './store';
import { config } from '@/data/config';

export function openWhatsApp(isMember: boolean) {
  const memberStatus = isMember
    ? "I am a member."
    : "I am not a member yet.";

  const message = encodeURIComponent(`Hi, I want to place an order. ${memberStatus}`);
  const url = `https://wa.me/${config.storePhone}?text=${message}`;
  window.open(url, '_blank');
}

export function sendOrderOnWhatsApp(cart: CartItem[], total: number, isMember: boolean) {
  if (cart.length === 0) return;

  const memberStatus = isMember
    ? "I am a member (Free Delivery)"
    : "I am not a member";

  const orderItems = cart.map(item =>
    `• ${item.emoji} ${item.name} × ${item.qty} = ${config.currency}${item.price * item.qty}`
  ).join('\n');

  const message = encodeURIComponent(
    `Hi, I want to place an order.\n\n` +
    `${memberStatus}\n\n` +
    `*Order Details:*\n${orderItems}\n\n` +
    `*Total: ${config.currency}${total}*`
  );

  const url = `https://wa.me/${config.storePhone}?text=${message}`;
  window.open(url, '_blank');
}
