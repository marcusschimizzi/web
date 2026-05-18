import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Gold — the single accent across the system
                gold: {
                    50:  '#fdf8e8',
                    100: '#faedc4',
                    200: '#f5dc8b',
                    300: '#f0c95a',
                    400: '#e6b54a',
                    500: '#d4a13a',
                    600: '#b88a2c',
                    700: '#92691f',
                    800: '#6e4f17',
                    900: '#4a3510',
                    950: '#2a1f08',
                },
                // Aliases so legacy `primary/secondary/tertiary/pop` references still pick up gold
                primary:   { 50:'#fdf8e8',100:'#faedc4',200:'#f5dc8b',300:'#f0c95a',400:'#e6b54a',500:'#d4a13a',600:'#b88a2c',700:'#92691f',800:'#6e4f17',900:'#4a3510',950:'#2a1f08' },
                secondary: { 50:'#fdf8e8',100:'#faedc4',200:'#f5dc8b',300:'#f0c95a',400:'#e6b54a',500:'#d4a13a',600:'#b88a2c',700:'#92691f',800:'#6e4f17',900:'#4a3510',950:'#2a1f08' },
                tertiary:  { 50:'#fdf8e8',100:'#faedc4',200:'#f5dc8b',300:'#f0c95a',400:'#e6b54a',500:'#d4a13a',600:'#b88a2c',700:'#92691f',800:'#6e4f17',900:'#4a3510',950:'#2a1f08' },
                pop:       { 50:'#fdf8e8',100:'#faedc4',200:'#f5dc8b',300:'#f0c95a',400:'#e6b54a',500:'#d4a13a',600:'#b88a2c',700:'#92691f',800:'#6e4f17',900:'#4a3510',950:'#2a1f08' },
                // Ink / paper — warm off-white through near-black, in the `gray` key so existing classes inherit
                gray: {
                    50:  '#f4f1ea',
                    100: '#e6e2d8',
                    200: '#c9c4b8',
                    300: '#a8a39a',
                    400: '#8a8580',
                    500: '#6a665f',
                    600: '#4a4742',
                    700: '#2a2826',
                    800: '#1a1816',
                    900: '#0d0c0a',
                    950: '#050505',
                },
                ink: {
                    DEFAULT: '#f4f1ea',
                    dim:    '#8a8580',
                    faint:  '#4a4742',
                },
                paper: {
                    DEFAULT: '#050505',
                    raised:  '#0d0c0a',
                },
            },
            fontFamily: {
                sans:  ['Geist', 'Helvetica', 'Arial', 'sans-serif'],
                mono:  ['"Geist Mono"', 'ui-monospace', 'monospace'],
                serif: ['"Instrument Serif"', 'Georgia', 'serif'],
            },
            letterSpacing: {
                tightest: '-0.045em',
            },
        },
    },
    plugins: [typography],
};
