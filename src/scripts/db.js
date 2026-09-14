export const DB = {
    /** @param {any} initialData */
    init(initialData) {
        const data = DB.get()
        if (Object.keys(data).length === 0) {
            return DB.set(initialData)
        }
        return data
    },
    
    get() {
        const item = localStorage.getItem('@jobscalc:app')
        return item ? JSON.parse(item) : {}
    },
    
    /** @param {any} app */
    set(app) {
        localStorage.setItem('@jobscalc:app', JSON.stringify(app))

        return DB.get()
    }
}