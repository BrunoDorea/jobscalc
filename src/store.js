import { writable } from "svelte/store"
import { Project } from "./scripts/projects"
import { DB } from "./scripts/db"

const createApp = (initialData) => {
    const data= DB.init(initialData)
    const app = writable(data)

    if(data.projects?.length > 0) {
        data.projects = data.projects.map(
            p => new Project(p.name, p.dailyHours, p.totalHours)
        )
    }

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