export type Profile = { id: string; name: string };
export type LoadProfile = (id: string) => Promise<Profile>;

// Local simulated transport; no network or credentials are used.
export const loadProfile: LoadProfile = (id) => new Promise((resolve, reject) => {
  const delay = id === 'ada' ? 900 : 150;
  setTimeout(() => {
    if (id === 'error') reject(new Error('Simulated service failure'));
    else resolve({ id, name: id === 'ada' ? 'Ada' : 'Grace' });
  }, delay);
});
