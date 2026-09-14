import { DB } from "./db"

/**
 * @param {Function} func
 * @param {number} delay
 */
function debounce(func, delay = 500) {
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timeout
    /** @param {...any} args */
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

/** @param {any} data */
function autosave(data) {
    DB.set(data) 
}

export const debouncedAutosave = debounce(autosave, 700)