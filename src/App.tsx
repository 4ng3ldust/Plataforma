// src/App.tsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import './index.css'
import { supabase } from './utils/supabaseClient'

const App: React.FC = () => {
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, session)
    })
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App
