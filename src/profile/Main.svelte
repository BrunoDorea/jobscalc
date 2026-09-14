<script>
    import Aside from "../parts/Aside.svelte"
    import { app } from '../store.js'
    import { Calculate } from '../scripts/calculate.js'

    let name = $app.user?.name || ''
    let avatar = $app.user?.avatar || ''
    let monthlyIncome = $app.planning?.monthlyIncome ?? 0
    let hoursPerDay = $app.planning?.hoursPerDay ?? 0
    let daysAWeek = $app.planning?.daysAWeek ?? 0
    let vacationWeeks = $app.planning?.vacationWeeks ?? 0

    let errors = {
        name: '',
        monthlyIncome: '',
        hoursPerDay: '',
        daysAWeek: '',
        vacationWeeks: ''
    }

    $: tempPlanning = {
        monthlyIncome: Number(monthlyIncome),
        hoursPerDay: Number(hoursPerDay),
        daysAWeek: Number(daysAWeek),
        vacationWeeks: Number(vacationWeeks)
    }
    $: tempApp = { ...$app, planning: tempPlanning }
    $: formattedValueHour = new Calculate(tempApp).formattedValueHour

    function validate() {
        errors = {
            name: '',
            monthlyIncome: '',
            hoursPerDay: '',
            daysAWeek: '',
            vacationWeeks: ''
        }
        let isValid = true

        if (!name || !name.trim()) {
            errors.name = 'O nome é obrigatório.'
            isValid = false
        }

        if (monthlyIncome === '' || monthlyIncome === null || Number(monthlyIncome) <= 0) {
            errors.monthlyIncome = 'A renda mensal deve ser maior que zero.'
            isValid = false
        }

        if (hoursPerDay === '' || hoursPerDay === null || Number(hoursPerDay) <= 0 || Number(hoursPerDay) > 24) {
            errors.hoursPerDay = 'As horas por dia devem ser entre 1 e 24.'
            isValid = false
        }

        if (daysAWeek === '' || daysAWeek === null || Number(daysAWeek) <= 0 || Number(daysAWeek) > 7) {
            errors.daysAWeek = 'Os dias por semana devem ser entre 1 e 7.'
            isValid = false
        }

        if (vacationWeeks === '' || vacationWeeks === null || Number(vacationWeeks) < 0 || Number(vacationWeeks) >= 52) {
            errors.vacationWeeks = 'As semanas de férias devem ser entre 0 e 51.'
            isValid = false
        }

        return isValid
    }

    function handleSave() {
        if (!validate()) return

        $app.user = {
            name: name.trim(),
            avatar: avatar.trim() || 'https://github.com/brunodorea.png'
        }

        $app.planning = {
            monthlyIncome: Number(monthlyIncome),
            hoursPerDay: Number(hoursPerDay),
            daysAWeek: Number(daysAWeek),
            vacationWeeks: Number(vacationWeeks)
        }

        $app.page = 'home'
    }

    function handleCancel() {
        $app.page = 'home'
    }
</script>

<div class="container animate-up delay-2 flex justify-between max-w-4xl mx-auto p-12 gap-16">
    <div class="w-80 flex-shrink-0">
        <Aside>
            <img
                class="w-32 h-32 object-cover border-4 border-orange-400 rounded-full mx-auto"
                src={avatar || 'https://github.com/brunodorea.png'}
                alt={name || 'Avatar'}
                on:error={(e) => {
                    if (e.currentTarget instanceof HTMLImageElement) {
                        e.currentTarget.src = 'https://github.com/brunodorea.png'
                    }
                }}
            />
            <h2 class="text-2xl font-medium text-gray-600 text-center mt-4">
                {name || 'Seu Nome'}
            </h2>
            <p class="text-center mt-2 text-gray-600">
                O valor da sua hora é <br />
                <strong class="text-xl text-gray-800">{formattedValueHour}</strong>
            </p>
        </Aside>
    </div>

    <main class="flex-1">
        <form on:submit|preventDefault={handleSave}>
            <h2 class="text-3xl font-medium text-gray-600 border-b pb-4 mb-4">Dados do perfil</h2>

            <div class="flex gap-4">
                <div class="grid gap-2 flex-1">
                    <label for="name" class="text-gray-500 font-medium text-sm">Nome</label>
                    <input 
                        class="px-4 py-2 border rounded-sm text-sm {errors.name ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                        type="text" 
                        id="name" 
                        name="name" 
                        bind:value={name} 
                    />
                    {#if errors.name}
                        <span class="text-red-500 text-xs">{errors.name}</span>
                    {/if}
                </div>

                <div class="grid gap-2 flex-1">
                    <label for="avatar" class="text-gray-500 font-medium text-sm">Link da foto</label>
                    <input
                        class="px-4 py-2 border rounded-sm text-sm border-gray-300"
                        placeholder="https://"
                        type="url"
                        id="avatar"
                        name="avatar"
                        bind:value={avatar}
                    />
                </div>
            </div>

            <h2 class="text-3xl font-medium text-gray-600 border-b pb-4 mb-4 mt-8">Planejamento</h2>

            <div class="flex gap-4">
                <div class="grid gap-2 flex-1">
                    <label class="text-gray-500 font-medium text-sm" for="monthly-budget">
                        Quanto eu quero ganhar por mês?
                    </label>
                    <input
                        class="px-4 py-2 border rounded-sm text-sm {errors.monthlyIncome ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                        type="number"
                        min="1"
                        step="any"
                        id="monthly-budget"
                        name="monthly-budget"
                        placeholder="R$"
                        bind:value={monthlyIncome}
                    />
                    {#if errors.monthlyIncome}
                        <span class="text-red-500 text-xs">{errors.monthlyIncome}</span>
                    {/if}
                </div>

                <div class="grid gap-2 flex-1">
                    <label class="text-gray-500 font-medium text-sm" for="hours-per-day">
                        Quantas horas quero trabalhar por dia?
                    </label>
                    <input
                        class="px-4 py-2 border rounded-sm text-sm {errors.hoursPerDay ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                        type="number"
                        min="1"
                        max="24"
                        id="hours-per-day"
                        name="hours-per-day"
                        bind:value={hoursPerDay}
                    />
                    {#if errors.hoursPerDay}
                        <span class="text-red-500 text-xs">{errors.hoursPerDay}</span>
                    {/if}
                </div>
            </div>

            <div class="flex gap-4 mt-4">
                <div class="grid gap-2 flex-1">
                    <label class="text-gray-500 font-medium text-sm" for="days-per-week">
                        Quantos dias quero trabalhar por semana?
                    </label>
                    <input
                        class="px-4 py-2 border rounded-sm text-sm {errors.daysAWeek ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                        type="number"
                        min="1"
                        max="7"
                        id="days-per-week"
                        name="days-per-week"
                        bind:value={daysAWeek}
                    />
                    {#if errors.daysAWeek}
                        <span class="text-red-500 text-xs">{errors.daysAWeek}</span>
                    {/if}
                </div>

                <div class="grid gap-2 flex-1">
                    <label class="text-gray-500 font-medium text-sm" for="vacation-per-year">
                        Quantas semanas por ano você quer tirar férias?
                    </label>
                    <input
                        class="px-4 py-2 border rounded-sm text-sm {errors.vacationWeeks ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                        type="number"
                        min="0"
                        max="51"
                        id="vacation-per-year"
                        name="vacation-per-year"
                        bind:value={vacationWeeks}
                    />
                    {#if errors.vacationWeeks}
                        <span class="text-red-500 text-xs">{errors.vacationWeeks}</span>
                    {/if}
                </div>
            </div>

            <div class="flex gap-3 pt-8 mt-6 border-t border-gray-200">
                <button
                    type="submit"
                    class="bg-orange-400 hover:bg-orange-500 text-white font-bold text-xs uppercase px-6 py-3 rounded transition-all shadow-sm"
                >
                    Salvar dados
                </button>
                <button
                    type="button"
                    on:click={handleCancel}
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs uppercase px-6 py-3 rounded transition-all"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </main>
</div>
