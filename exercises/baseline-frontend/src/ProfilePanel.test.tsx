import { afterEach, describe, expect, it } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { ProfilePanel } from './ProfilePanel';
import type { LoadProfile, Profile } from './api';

afterEach(cleanup);

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

describe('ProfilePanel acceptance behavior', () => {
  it('shows a successful profile', async () => {
    const load: LoadProfile = async (id) => ({ id, name: 'Ada' });
    render(<ProfilePanel userId="ada" load={load} />);
    expect((await screen.findByRole('heading')).textContent).toBe('Ada');
  });

  it('keeps the latest selected profile when requests finish in reverse order', async () => {
    const ada = deferred<Profile>();
    const grace = deferred<Profile>();
    const load: LoadProfile = (id) => id === 'ada' ? ada.promise : grace.promise;
    const view = render(<ProfilePanel userId="ada" load={load} />);
    view.rerender(<ProfilePanel userId="grace" load={load} />);
    await act(async () => { grace.resolve({ id: 'grace', name: 'Grace' }); });
    expect(screen.getByRole('heading').textContent).toBe('Grace');
    await act(async () => { ada.resolve({ id: 'ada', name: 'Ada' }); });
    expect(screen.getByRole('heading').textContent).toBe('Grace');
  });

  it('shows a current request error', async () => {
    const load: LoadProfile = async () => { throw new Error('Unavailable'); };
    render(<ProfilePanel userId="error" load={load} />);
    expect((await screen.findByRole('alert')).textContent).toBe('Unable to load profile');
  });

  // Add meaningful cases of your own during the implementation phase.
});
