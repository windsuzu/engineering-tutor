import { useState } from 'react';

// Q7 code-reading starter. Not mounted in main.tsx or browser-tested.
export function DialogProbe() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Edit profile</button>
      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="edit-title">
          <h2 id="edit-title">Edit profile</h2>
          <label>Name <input defaultValue="Ada" /></label>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
      <a href="#help">Help</a>
    </>
  );
}
