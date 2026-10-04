import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ProfilePanel } from './ProfilePanel';

function App() {
  const [userId, setUserId] = useState('ada');
  const [visible, setVisible] = useState(true);
  return (
    <main>
      <h1>Profile inspector</h1>
      <p>This project intentionally contains faults for assessment.</p>
      <div onClick={() => setUserId('ada')}>Choose Ada</div>
      <div onClick={() => setUserId('grace')}>Choose Grace</div>
      <div onClick={() => setUserId('error')}>Simulate failure</div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'} profile</button>
      {visible && <ProfilePanel userId={userId} />}
    </main>
  );
}

// No StrictMode here: the first prediction assumes one request per selection.
createRoot(document.getElementById('root')!).render(<App />);
