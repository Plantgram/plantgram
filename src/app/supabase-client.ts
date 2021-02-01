import { environment } from 'src/environments/environment';

import { InjectionToken } from '@angular/core';
import {
    createClient,
    SupabaseClient,
} from '@supabase/supabase-js';

const { url, key } = environment.supabase;
export const supabaseClient: SupabaseClient = createClient(url, key, {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
});

export let SUPABASE_CLIENT = new InjectionToken<SupabaseClient>('app.supabaseClient');
