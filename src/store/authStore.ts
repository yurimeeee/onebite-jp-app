import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Platform } from 'react-native';

import { auth } from '../services/firebase';
import { create } from 'zustand';

let GoogleSignin: any = null;
if (Platform.OS !== 'web') {
  try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
    GoogleSignin.configure({
      webClientId: '795524297087-spa3j7n8pjhgc6qhj66b4c39lbg1eid6.apps.googleusercontent.com',
      iosClientId: '795524297087-5jeahe43pj93rshp1vlkmltu7n4bljl6.apps.googleusercontent.com',
    });
  } catch {
    // Expo Go에서는 네이티브 모듈 사용 불가 — Firebase 웹 SDK로 fallback
  }
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  signup: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },

  googleLogin: async () => {
    if (GoogleSignin) {
      // 개발 빌드 (네이티브 Google Sign-In)
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (!idToken) throw new Error('Google 로그인에서 토큰을 받지 못했습니다.');
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } else {
      // 웹 또는 Expo Go (Firebase 웹 SDK)
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    }
  },

  logout: async () => {
    await signOut(auth);
    if (Platform.OS !== 'web' && GoogleSignin) {
      try {
        await GoogleSignin.signOut();
      } catch {}
    }
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
