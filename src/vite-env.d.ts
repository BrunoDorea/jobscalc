/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
    export { SvelteComponent as default } from 'svelte';
}

declare module 'dayjs/locale/*' {
    const locale: any;
    export default locale;
}

