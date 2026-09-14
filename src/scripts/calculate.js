/**
 * @typedef {import('./projects').Project} Project
 */

export class Calculate {
    /**
     * @param {any} app
     * @param {Project | any} [project]
     */
    constructor(app, project = null) {
        this.project = project || app?.currentProject || {}
        this.planning = app?.planning || {}
        /** @type {Project[]} */
        this.projects = app?.projects || []
    }

    get valueHour() {
        const weeksPerYear = 52
        const vacationWeeks = Number(this.planning.vacationWeeks) || 0
        const weeksPerMonth = (weeksPerYear - vacationWeeks) / 12

        const hoursPerDay = Number(this.planning.hoursPerDay) || 0
        const daysAWeek = Number(this.planning.daysAWeek) || 0
        const weekTotalHours = hoursPerDay * daysAWeek

        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        if (monthlyTotalHours <= 0) return 0

        const monthlyIncome = Number(this.planning.monthlyIncome) || 0
        return monthlyIncome / monthlyTotalHours
    }

    get formattedValueHour() {
        return Number(this.valueHour).toLocaleString('pt-br', {
            currency: 'BRL', style: 'currency'
        })
    }

    get projectValue() {
        const totalHours = Number(this.project?.totalHours) || 0
        return Number(this.valueHour) * totalHours
    }

    get formattedProjectValue() {
        return Number(this.projectValue).toLocaleString('pt-br', { 
            currency: 'BRL', style: 'currency' 
        })
    }

    get projectsTotalHours() {
        return this.projects.reduce((acc, project) => {
            return project.status === 'em andamento'
            ? acc + Number(project.dailyHours || 0)
            : acc
        }, 0)
    }

    get freeHours() {
        const hoursPerDay = Number(this.planning.hoursPerDay) || 0
        return hoursPerDay - this.projectsTotalHours
    }

    get projectsStatus() {
        return {
            total: this.projects.length,
            progress: this.projects.filter(project => project.status === 'em andamento').length,
            done: this.projects.filter(project => project.status === 'encerrado').length,
        }
    }
}