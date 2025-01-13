import { writable } from 'svelte/store';
import type { WaitlistEntry } from '$lib/types/reservation';

function createWaitlistStore() {
  const { subscribe, set, update } = writable<WaitlistEntry[]>([]);

  return {
    subscribe,
    add: (entry: WaitlistEntry) => 
      update(entries => [...entries, entry]),
    updateStatus: (id: string, status: WaitlistEntry['status']) =>
      update(entries =>
        entries.map(entry =>
          entry.id === id ? { ...entry, status } : entry
        )
      ),
    remove: (id: string) =>
      update(entries => entries.filter(entry => entry.id !== id)),
    getActiveEntries: (date: Date) => {
      let activeEntries: WaitlistEntry[] = [];
      const unsubscribe = waitlist.subscribe(entries => {
        activeEntries = entries.filter(entry => 
          entry.date.toDateString() === date.toDateString() &&
          entry.status === 'waiting'
        );
      });
      unsubscribe();
      return activeEntries;
    }
  };
}

export const waitlist = createWaitlistStore();

function get(waitlist: { 
  subscribe: (this: void, run: any, invalidate?: any) => void; 
  add: (entry: WaitlistEntry) => void; 
  updateStatus: (id: string, status: WaitlistEntry["status"]) => void;
  remove: (id: string) => void; 
  getActiveEntries: (date: Date) => any; 
}) {
  let entries: WaitlistEntry[] = [];
  waitlist.subscribe((currentEntries:any) => {
    entries = currentEntries;
  });
  return entries;
}

// function get(waitlist: { subscribe: (this: void, run: Subscriber<WaitlistEntry[]>, invalidate?: Invalidator<WaitlistEntry[]> | undefined) => Unsubscriber; add: (entry: WaitlistEntry) => void; updateStatus: (id: string, status: WaitlistEntry["status"]) => void; remove: (id: string) => void; getActiveEntries: (date: Date) => any; }) {
//   throw new Error('Function not implemented.');
// }
