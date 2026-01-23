import { 
  auth, 
  signInWithPopup, 
  googleProvider
} from '@/lib/firebase';
import api from './api';

const urlToBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao converter URL para base64:', error);
    return null;
  }
};

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error('Firebase Auth não está disponível');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();

    let fotoBase64 = null;
    if (user.photoURL) {
      fotoBase64 = await urlToBase64(user.photoURL);
    }

    const response = await api.post('/auth/login-social', {
      provider: 'GOOGLE',
      idToken: idToken,
      email: user.email,
      nome: user.displayName,
      foto: fotoBase64,
    });

    const { token, roles, newTrustedDeviceToken } = response.data;

    if (newTrustedDeviceToken) {
      localStorage.setItem('trustedDeviceToken', newTrustedDeviceToken);
    }

    localStorage.setItem('userToken', token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', user.email || '');
    localStorage.setItem('userRoles', JSON.stringify(roles));

    return { token, roles, user };
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Login cancelado pelo usuário');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup bloqueado pelo navegador. Permita popups para este site.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('Uma conta já existe com o mesmo endereço de e-mail, mas com credenciais diferentes.');
    } else {
      console.error('Erro no login com Google:', error);
      throw new Error(error.message || 'Erro ao fazer login com Google');
    }
  }
};

