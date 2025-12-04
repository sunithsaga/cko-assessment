import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ['junit', 'verbose'],
    environment: 'jsdom',
    globals: true,
    outputFile: {
      junit: './junit.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/*.config.*',
        
        '**/postcss.config.js',
        '**/tailwind.config.js',
        
        'payment-list-challenge-react/public/**',
        
        '**/mockServiceWorker.js',
        
        'payment-list-challenge-react', 
      ],
    },
    
    exclude: [
      'node_modules/**',
      '**.config.ts', 
      '**/postcss.config.js',
      '**/tailwind.config.js',
    ]
  },
});