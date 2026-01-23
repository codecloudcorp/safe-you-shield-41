import { messaging, onMessage } from '@/lib/firebase';
import { toast } from 'sonner';

export const setupForegroundNotifications = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    const title = payload.notification?.title || 'Safe You';
    const body = payload.notification?.body || 'Você tem uma nova notificação';
    
    toast.success(`${title}: ${body}`, {
      duration: 5000,
    });

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: payload.data?.tag || 'default',
      });
    }
  });
};

