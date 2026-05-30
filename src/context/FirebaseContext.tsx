import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';

interface FirebaseContextType {
  db: Firestore | null;
  auth: any;
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Firestore | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const configResp = await fetch('/firebase-applet-config.json');
        if (!configResp.ok) throw new Error('Firebase not configured');
        const config = await configResp.json();
        
        const app = initializeApp(config);
        const firestore = getFirestore(app, config.firestoreDatabaseId);
        const firebaseAuth = getAuth(app);
        
        setDb(firestore);
        setAuth(firebaseAuth);

        // Test connection
        try {
          await getDocFromServer(doc(firestore, 'test', 'connection'));
        } catch (e) {
          console.warn('Firebase connection test failed, might be initial setup');
        }

        firebaseAuth.onAuthStateChanged((u) => {
          setUser(u);
          setLoading(false);
        });
      } catch (error) {
        console.error('Firebase init error:', error);
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, auth, user, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
