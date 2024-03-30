import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            ...colors,
            alternative: '#333333',
            banner: '#F4F4F4',
            border: '#C1C1C1',
            checkbox: '#CCCCCC',
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
} satisfies Config;
