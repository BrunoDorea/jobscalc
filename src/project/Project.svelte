<script>
    import Header from "../parts/Header.svelte"
    import Main from "./Main.svelte"
    import Aside from "../parts/Aside.svelte"
    import { app } from "../store.js"
    import { Calculate } from "../scripts/calculate"
    import { Project } from "../scripts/projects"

    const isEditing = $app.projects.some((/** @type {Project} */ p) => p.id === $app.currentProject?.id)
    const pageTitle = isEditing ? "Editar Job" : "Novo Job"

    let name = $app.currentProject?.name || ''
    let dailyHours = $app.currentProject?.dailyHours ?? 1
    let totalHours = $app.currentProject?.totalHours ?? 1
    let id = $app.currentProject?.id || crypto.randomUUID()
    let createdAt = $app.currentProject?.createdAt || new Date()

    let errors = {
        name: '',
        dailyHours: '',
        totalHours: ''
    }

    $: tempProject = new Project(name, dailyHours, totalHours, id, createdAt)
    $: projectValue = new Calculate($app, tempProject).formattedProjectValue

    function validate() {
        errors = { name: '', dailyHours: '', totalHours: '' }
        let isValid = true

        if (!name || !name.trim()) {
            errors.name = 'O nome do projeto é obrigatório.'
            isValid = false
        }

        if (dailyHours === '' || dailyHours === null || Number(dailyHours) <= 0) {
            errors.dailyHours = 'As horas diárias devem ser maiores que zero.'
            isValid = false
        } else if (Number(dailyHours) > 24) {
            errors.dailyHours = 'As horas diárias não podem ser maiores que 24.'
            isValid = false
        }

        if (totalHours === '' || totalHours === null || Number(totalHours) <= 0) {
            errors.totalHours = 'A estimativa total de horas deve ser maior que zero.'
            isValid = false
        }

        return isValid
    }

    function handleSave() {
        if (!validate()) return

        const updatedProject = new Project(
            name.trim(),
            Number(dailyHours),
            Number(totalHours),
            id,
            createdAt
        )

        const existingIndex = $app.projects.findIndex((/** @type {Project} */ p) => p.id === id)
        if (existingIndex >= 0) {
            const updated = [...$app.projects]
            updated[existingIndex] = updatedProject
            $app.projects = updated
        } else {
            $app.projects = [...$app.projects, updatedProject]
        }

        $app.page = 'home'
    }

    function handleCancel() {
        $app.page = 'home'
    }

    function handleDelete() {
        if (confirm("Tem certeza que deseja excluir esse projeto?")) {
            $app.projects = $app.projects.filter((/** @type {Project} */ p) => p.id !== id)
            $app.page = 'home'
        }
    }
</script>

<div class="bg-gray-100 min-h-screen">
    <Header title={pageTitle} />
    <div
        class="container animate-up delay-2 flex justify-between p-12 max-w-4xl mx-auto gap-16"
    >
        <div class="w-1/2">
            <Main
                bind:name
                bind:dailyHours
                bind:totalHours
                {errors}
                {isEditing}
                on:save={handleSave}
                on:cancel={handleCancel}
                on:delete={handleDelete}
            />
        </div>    

        <div class="flex-grow-0 text-center">
            <Aside>
                <img src="/images/money-color.svg" alt="Imagem de Dinheiro" class="mx-auto" />
                <p class="mt-8 text-gray-600">
                    O valor do projeto ficou em <strong>{projectValue}</strong>
                </p>
            </Aside>
        </div>
    </div>
</div>
