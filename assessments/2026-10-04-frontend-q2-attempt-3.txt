import { useEffect, useState } from 'react';
import { loadProfile, type LoadProfile, type Profile } from './api';

export function ProfilePanel({ userId, load = loadProfile }: { userId: string; load?: LoadProfile }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  
  const requestRef = useRef(null)

  useEffect(() => {
    setStatus('loading');
    async function fetchProfile() {
     const id = uuid()
     requestRef.current = id
      try {
        
        const result = await load(userId);
        if (requestRef.current === id) {
          setProfile(result);
          setStatus('ready');
        }
        
      } catch {
        if (requestRef.current === id) {
          setStatus('error');
        }
      } 
    }

    void fetchProfile();
    return () => {
      setProfile(null)
      requestRef.current = null
    }
  }, [userId, load]);

  return (
    <section aria-label="Profile">
      <p>Selected: {userId}</p>
      {status === 'loading' && <p role="status">Loading...</p>}
      {status === 'error' && <p role="alert">Unable to load profile</p>}
      {status === 'ready' && profile && <h2>{profile.name}</h2>}
    </section>
  );
}
