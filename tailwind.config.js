/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS files in src
        "./public/index.html",        // Scans your main HTML file
      ],
    theme: {
      extend: {
        colors: {
          // Define custom colors based on your app's theme
          // These names can then be used like `bg-beige-50` or `text-amber-500`
          beige: {
            50: '#FDFBF5',    // Similar to bg-beige-50 in your app
            100: '#FAF7F0',   // Similar to bg-beige-100
            200: '#F5F0E6',   // Similar to bg-beige-200 / secondary button
            // Add more shades as needed
          },
          amber: {
            50: '#FFFBEB',    // Lighter amber for hover states like outline button
            100: '#FEF3C7',   // Similar to hover bg-amber-100
            300: '#FCD34D',   // Similar to border-amber-300 / text-amber-300
            400: '#FBBF24',   // Similar to text-amber-400 (logo)
            500: '#F59E0B',   // Similar to bg-amber-500 (default button) / ring-amber-500
            600: '#D97706',   // Similar to text-amber-600 / hover:bg-amber-600
            700: '#B45309',   // Similar to text-amber-700 / text-yellow-700
          },
          stone: {
            300: '#D6D3D1',   // Similar to border-stone-300
            400: '#A8A29E',   // Similar to placeholder:text-stone-400 / text-stone-400
            500: '#78716C',   // Similar to text-stone-500
            600: '#57534E',   // Similar to text-stone-600
            700: '#44403C',   // Similar to text-stone-700
            800: '#292524',   // Similar to bg-stone-800 (footer)
          },
          // Your existing text-yellow-XXX usage can be mapped here or kept as is if
          // you prefer using Tailwind's default yellow. For consistency, mapping is good.
          // Example:
          // yellow: {
          //   600: '#D97706', // If your text-yellow-600 is actually amber-600
          //   700: '#B45309', // If your text-yellow-700 is actually amber-700
          // }
        },
        fontFamily: {
          // Define custom font families if you're not relying solely on the body style in index.html
          // The body style in index.html sets a system font stack.
          // Your App.js uses `font-serif` as a Tailwind class.
          // You can ensure 'serif' maps to your desired fonts here, or add specific ones.
          sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
          serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
          mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        },
        // You can also extend other theme properties like spacing, borderRadius, etc.
        // For example, if you use specific rounded corners often:
        // borderRadius: {
        //   'xl': '0.75rem', // Default Tailwind xl
        //   'card': '0.75rem', // Custom alias for your card radius
        // }
      },
    },
    plugins: [
      require('@tailwindcss/typography'), // For the `prose` classes used in DetailPageSection
      // require('@tailwindcss/forms'), // If you want pre-styled form elements
    ],
  }
  