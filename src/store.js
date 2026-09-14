import { writable } from "svelte/store"
import { Project } from "./scripts/projects"
import { DB } from "./scripts/db"

import { debouncedAutosave } from "./scripts/utils"

/**
 * @param {any} initialData
 */
const createApp = (initialData) => {
    const data = DB.init(initialData)

    if (data.projects?.length > 0) {
        data.projects = data.projects.map(
            /** @param {any} p */
            (p) => new Project(p.name, p.dailyHours, p.totalHours, p.id, p.createdAt)
        )
    }

    if (data.currentProject) {
        const cp = data.currentProject
        data.currentProject = new Project(cp.name, cp.dailyHours, cp.totalHours, cp.id, cp.createdAt)
    }

    const app = writable(data)

    // Autosave centralizado: persiste automaticamente no localStorage quando a store mudar
    app.subscribe((value) => {
        if (value) {
            debouncedAutosave(value)
        }
    })

    return app
}

export const app = createApp({
    user: {
        name: 'Bruno Henrique',
        avatar: 'https://github.com/brunodorea.png',
    },
    planning: {
        monthlyIncome: 12000,
        hoursPerDay: 8,
        daysAWeek: 5,
        vacationWeeks: 4,
    },
    projects: [
        new Project('Blablabla 1', 1, 4),
        new Project('Site 1', 2, 3),
    ],
    page: "home",
    currentProject: new Project()
})