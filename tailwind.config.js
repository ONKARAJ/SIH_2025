/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "0.75rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '475px',      // Extra small devices (large phones)
      'sm': '640px',      // Small devices (tablets)
      'md': '768px',      // Medium devices (small laptops)
      'lg': '1024px',     // Large devices (desktops)
      'xl': '1280px',     // Extra large devices (large desktops)
      '2xl': '1536px',    // 2X large devices (larger desktops)
      
      // Custom mobile-specific breakpoints
      'mobile': {'max': '767px'},        // Mobile-first approach
      'tablet': {'min': '768px', 'max': '1023px'}, // Tablet range
      'desktop': {'min': '1024px'},      // Desktop and above
      
      // Orientation specific
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait': {'raw': '(orientation: portrait)'},
      
      // Device pixel ratio
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2)'},
    },
    extend: {
      // Mobile-optimized spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Touch-friendly minimum sizes
      minHeight: {
        'touch': '44px',    // Apple's recommended minimum touch target
        'touch-lg': '48px', // Larger touch target
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      
      // Mobile-optimized font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      
      // Colors for the tourism site
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tourism specific colors
        'nature-green': '#16a34a',
        'sunset-orange': '#ea580c',
        'waterfall-blue': '#0ea5e9',
        'earth-brown': '#a3520b',
      },
      
      // Mobile-optimized border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'touch': '8px',  // Better for touch interfaces
      },
      
      // Animation for mobile interactions
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
      },
      
      // Enhanced box shadows for mobile
      boxShadow: {
        'touch': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'touch-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'mobile': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      
      // Line clamp utilities
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/line-clamp"),
    
    // Custom plugin for mobile utilities
    function({ addUtilities, theme, variants }) {
      const newUtilities = {
        // Touch action utilities
        '.touch-pan-x': {
          'touch-action': 'pan-x',
        },
        '.touch-pan-y': {
          'touch-action': 'pan-y',
        },
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.touch-none': {
          'touch-action': 'none',
        },
        
        // Safe area utilities
        '.safe-top': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.safe-left': {
          'padding-left': 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          'padding-right': 'env(safe-area-inset-right)',
        },
        
        // Mobile text optimization
        '.mobile-text': {
          '-webkit-text-size-adjust': '100%',
          'text-size-adjust': '100%',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        
        // Mobile scroll optimization
        '.mobile-scroll': {
          '-webkit-overflow-scrolling': 'touch',
          'scroll-behavior': 'smooth',
        },
        
        // Prevent tap highlight
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      }
      
      addUtilities(newUtilities, variants(['responsive']))
    }
  ],
}