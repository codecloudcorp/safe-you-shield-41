import { useState, useEffect } from 'react';
import { messaging, getToken } from '@/lib/firebase';
import { toast } from 'sonner';

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSupport = () => {
      const supported = 
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window &&
        messaging !== null;
      
      setIsSupported(supported);
      
      if (supported && 'Notification' in window) {
        setPermission(Notification.permission);
      }
      
      setIsLoading(false);
    };

    checkSupport();
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported || !messaging) {
      toast.error("Notificações não suportadas. Seu navegador não suporta notificações push.");
      return false;
    }

    try {
      const currentPermission = Notification.permission;
      
      if (currentPermission === 'granted') {
        await getFCMToken();
        return true;
      }

      if (currentPermission === 'denied') {
        toast.error("Permissão negada. Por favor, permita notificações nas configurações do navegador.");
        return false;
      }

      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);

      if (newPermission === 'granted') {
        await getFCMToken();
        toast.success("Notificações ativadas! Você receberá notificações push do Safe You.");
        return true;
      } else {
        toast.error("Permissão negada. As notificações push não foram ativadas.");
        return false;
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      toast.error("Erro ao ativar as notificações.");
      return false;
    }
  };

  const getFCMToken = async (): Promise<string | null> => {
    if (!messaging) {
      console.error('Messaging não está disponível');
      return null;
    }

    try {
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
      
      if (!vapidKey) {
        console.warn('VAPID key não configurada. Configure VITE_FIREBASE_VAPID_KEY no .env');
        toast.error("VAPID key não configurada. Configure VITE_FIREBASE_VAPID_KEY no .env");
        return null;
      }

      if (vapidKey.length < 80) {
        console.error('VAPID key parece estar incompleta ou no formato incorreto');
        toast.error("VAPID key inválida. A chave deve ter pelo menos 80 caracteres. Obtenha a chave correta no Firebase Console > Configurações do Projeto > Cloud Messaging > Chaves da Web Push");
        return null;
      }

      if (!('serviceWorker' in navigator)) {
        console.error('Service Worker não suportado');
        return null;
      }

      let registration;
      try {
        registration = await navigator.serviceWorker.ready;
      } catch (error) {
        console.error('Erro ao aguardar Service Worker:', error);
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        registration = await navigator.serviceWorker.ready;
      }

      const token = await getToken(messaging, {
        vapidKey: vapidKey.trim(),
        serviceWorkerRegistration: registration,
      });

      if (token) {
        setFcmToken(token);
        localStorage.setItem('fcmToken', token);
        console.log('Token FCM obtido com sucesso:', token);
        return token;
      } else {
        console.warn('Não foi possível obter o token FCM - token vazio');
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter token FCM:', error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.error('Detalhes do erro:', errorMessage);
        
        if (errorMessage.includes('Invalid raw ECDSA P-256 public key')) {
          toast.error("VAPID key inválida! Obtenha a chave correta no Firebase Console: Configurações do Projeto > Cloud Messaging > Chaves da Web Push");
        } else {
          toast.error(`Erro ao obter token: ${errorMessage}`);
        }
      }
      return null;
    }
  };

  const initializeNotifications = async () => {
    if (!isSupported) return;

    if ('serviceWorker' in navigator) {
      try {
        const existingRegistration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
        if (!existingRegistration) {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registrado:', registration);
          await navigator.serviceWorker.ready;
        } else {
          console.log('Service Worker já registrado:', existingRegistration);
          await existingRegistration.update();
        }
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
      }
    }

    if (permission === 'granted') {
      const storedToken = localStorage.getItem('fcmToken');
      if (storedToken) {
        setFcmToken(storedToken);
      } else {
        setTimeout(async () => {
          await getFCMToken();
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isSupported) {
      initializeNotifications();
    }
  }, [isLoading, isSupported, permission]);

  return {
    isSupported,
    permission,
    fcmToken,
    isLoading,
    requestPermission,
    getFCMToken,
  };
};

