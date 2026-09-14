<script>
    import { createEventDispatcher } from 'svelte'

    export let name = ''
    export let dailyHours = 1
    export let totalHours = 1
    export let errors = { name: '', dailyHours: '', totalHours: '' }
    export let isEditing = false

    const dispatch = createEventDispatcher()
</script>

<main>
    <h2 class="text-3xl font-medium text-gray-600 border-b pb-4 mb-4">
        {isEditing ? 'Editar Job' : 'Dados do projeto'}
    </h2>

    <form on:submit|preventDefault={() => dispatch('save')} class="space-y-6">
        <div class="grid gap-2">
            <label for="name" class="text-gray-500 font-medium text-sm">
                Nome do projeto
            </label>
            <input
                class="px-4 py-2 border rounded-sm text-sm {errors.name ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Novo Website"
                bind:value={name}
            />
            {#if errors.name}
                <span class="text-red-500 text-xs">{errors.name}</span>
            {/if}
        </div>

        <div class="flex gap-4">
            <div class="grid gap-2 flex-1">
                <label for="daily-hours" class="text-gray-500 font-medium text-sm">
                    Quantas horas por dia vai dedicar ao job?
                </label>
                <input
                    class="px-4 py-2 border rounded-sm text-sm {errors.dailyHours ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    id="daily-hours"
                    name="daily-hours"
                    bind:value={dailyHours}
                />
                {#if errors.dailyHours}
                    <span class="text-red-500 text-xs">{errors.dailyHours}</span>
                {/if}
            </div>

            <div class="grid gap-2 flex-1">
                <label for="total-hours" class="text-gray-500 font-medium text-sm">
                    Estimativa de horas para esse Job?
                </label>
                <input
                    class="px-4 py-2 border rounded-sm text-sm {errors.totalHours ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}"
                    type="number"
                    step="0.5"
                    min="0.5"
                    id="total-hours"
                    name="total-hours"
                    bind:value={totalHours}
                />
                {#if errors.totalHours}
                    <span class="text-red-500 text-xs">{errors.totalHours}</span>
                {/if}
            </div>
        </div>

        <div class="flex items-center justify-between pt-6 border-t border-gray-200">
            <div class="flex gap-3">
                <button
                    type="submit"
                    class="bg-orange-400 hover:bg-orange-500 text-white font-bold text-xs uppercase px-6 py-3 rounded transition-all shadow-sm"
                >
                    Salvar
                </button>
                <button
                    type="button"
                    on:click={() => dispatch('cancel')}
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs uppercase px-6 py-3 rounded transition-all"
                >
                    Cancelar
                </button>
            </div>

            {#if isEditing}
                <button
                    type="button"
                    on:click={() => dispatch('delete')}
                    class="flex items-center gap-2 border border-gray-300 hover:border-red-400 hover:bg-red-50 px-3 py-2 rounded transition-all text-gray-600 hover:text-red-600 text-xs font-semibold"
                    title="Excluir Job"
                >
                    <img src="/images/trash-24.svg" alt="Excluir" class="w-4 h-4" />
                    <span>Excluir Job</span>
                </button>
            {/if}
        </div>
    </form>
</main>


