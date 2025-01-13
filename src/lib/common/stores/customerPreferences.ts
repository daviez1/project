import { Invalidator, Subscriber, Unsubscriber, writable } from 'svelte/store';
import type { CustomerPreferences } from '$lib/types/reservation';

function createCustomerPreferencesStore() {
  const { subscribe, set, update } = writable<CustomerPreferences[]>([]);

  return {
    subscribe,
    add: (preferences: CustomerPreferences) =>
      update(prefs => [...prefs, preferences]),
    update: (id: string, preferences: Partial<CustomerPreferences>) =>
      update(prefs =>
        prefs.map(pref =>
          pref.id === id ? { ...pref, ...preferences } : pref
        )
      ),
    getByCustomerId: (customerId: string) => {
      let prefs: CustomerPreferences[] = [];
      const unsubscribe = customerPreferences.subscribe(value => {
        prefs = value;
      });
      unsubscribe();
      return prefs.find(pref => pref.customerId === customerId);
    }
  };
}

export const customerPreferences = createCustomerPreferencesStore();

function get(customerPreferences: { subscribe: (this: void, run: Subscriber<CustomerPreferences[]>, invalidate?: Invalidator<CustomerPreferences[]> | undefined) => Unsubscriber; add: (preferences: CustomerPreferences) => void; update: (id: string, preferences: Partial<CustomerPreferences>) => void; getByCustomerId: (customerId: string) => any; }) {
  let prefs: CustomerPreferences[] = [];
  const unsubscribe = customerPreferences.subscribe(value => {
    prefs = value;
  });
  unsubscribe();
  return prefs;
}

