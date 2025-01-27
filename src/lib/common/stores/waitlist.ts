import { writable } from 'svelte/store';
import type { WaitlistEntry } from '$lib/types/reservation';
import * as waitlistApi from "../api/waitlist";
import mongoose from 'mongoose';

function createWaitlistStore() {
  const { subscribe, set, update } = writable<WaitlistEntry[]>([]);

  return {
    subscribe,
    getWaitlistEntries: async()=>{
          const waitlist = await waitlistApi.get()
          set(waitlist)
          return waitlist
        },
    add: async(entry: WaitlistEntry) => {
      await waitlistApi.post(entry)  
      update(entries => [...entries, entry])
    },
    updateStatus: async(id: mongoose.Types.ObjectId) =>{
      const itemUpdated = await waitlistApi.PATCH(id)
      update(entries =>
        entries.map(entry =>
          entry._id === id ? entry = itemUpdated : entry
        )
      )},
    remove: async(id: mongoose.Types.ObjectId) => {
      await waitlistApi.DELETE(id)
      update(entries => entries.filter(entry => entry._id !== id))
    },
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