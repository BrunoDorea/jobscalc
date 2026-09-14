import { dayjs } from './dayjs.js'

export class Project {
    /**
     * @param {string} [name]
     * @param {number} [dailyHours]
     * @param {number} [totalHours]
     * @param {string} [id]
     * @param {Date | string} [createdAt]
     */
    constructor(name = 'Novo projeto', dailyHours = 1, totalHours = 1, id = crypto.randomUUID(), createdAt = new Date()) {
        this.id = id || crypto.randomUUID()
        this.name = name || 'Novo projeto'
        this.dailyHours = Number(dailyHours) || 1
        this.totalHours = Number(totalHours) || 1
        this.createdAt = new Date(createdAt)
    }
    
    get remainingDays() {
        const daily = Number(this.dailyHours) || 1
        const total = Number(this.totalHours) || 0
        const totalDays = Math.ceil(total / daily)
        const daysPassed = dayjs().startOf('day').diff(dayjs(this.createdAt).startOf('day'), 'day')
        return totalDays - daysPassed
    }

    get status() {
        return this.remainingDays < 0 ? 'encerrado' : 'em andamento'
    }
    
    get deadline() {
        return dayjs(this.createdAt).add(Math.ceil(Number(this.totalHours) / (Number(this.dailyHours) || 1)), 'day')
    }
}