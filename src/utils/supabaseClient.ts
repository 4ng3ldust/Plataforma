// src/utils/supabaseClient.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 VITE_SUPABASE_URL=', supabaseUrl)
console.log('🔍 VITE_SUPABASE_ANON_KEY=', supabaseAnonKey?.slice(0,8) + '…')

if (!supabaseUrl) {
  throw new Error(
    '🚨 VITE_SUPABASE_URL no está definido. Verifica .env.development y reinicia.'
  )
}
if (!supabaseAnonKey) {
  throw new Error(
    '🚨 VITE_SUPABASE_ANON_KEY no está definido. Verifica .env.development y reinicia.'
  )
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
)
