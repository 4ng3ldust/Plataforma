/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎯 Paleta Corporativa APPTUALIZATE (Azules)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Color principal
          600: '#2563eb',  // Hover/Active
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        
        // 🌊 Secundario (Cyan/Turquesa como el logo)
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',  // Turquesa del logo
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        
        // 🎨 Acentos
        accent: {
          blue: '#1e40af',     // Azul oscuro
          cyan: '#06b6d4',     // Cyan del logo
          indigo: '#4f46e5',   // Índigo
          teal: '#0d9488',     // Verde azulado
        },
        
        // 🔘 Grises corporativos
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        
        // 🚨 Estados
        success: '#10b981',   // Verde éxito
        warning: '#f59e0b',   // Amarillo advertencia
        error: '#ef4444',     // Rojo error
        info: '#3b82f6',      // Azul información
        
        // 🌙 Dark mode
        dark: {
          bg: '#0f172a',       // Fondo oscuro
          surface: '#1e293b',  // Superficie
          border: '#334155',   // Bordes
        }
      },
      
      // 🌈 Gradientes corporativos
      backgroundImage: {
        'gradient-corporate': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, #1e40af 0%, #1e293b 100%)',
        'gradient-header': 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
      },
      
      // 📐 Espaciado personalizado
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // 🔤 Tipografía
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      
      // 📦 Sombras corporativas
      boxShadow: {
        'corporate': '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
        'dark': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      
      // 🎭 Animaciones suaves
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-corporate': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}