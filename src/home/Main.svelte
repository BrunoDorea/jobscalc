<script>
    import Card from './Card.svelte'
    let jobs = [
        {
            id: 1,
            name: 'PS8',
            dailyHours: 8,
            totalHours: 30,
            createdAt: new Date(),
            status: "em progresso",
            remaining: 2,
            budget: 100,
        },
        {
            id: 2,
            name: 'Residencial',
            dailyHours: 8,
            totalHours: 1,
            createdAt: new Date(),
            status: "encerrado",
            remaining: 2,
            budget: 100,
        }
    ]
</script>

<div class="max-w-4xl mx-auto -mt-8">
    <main class="animate-up delay-2">
        <h1 class="sr-only">Trabalhos</h1>
        <div class="cards space-y-2">
            {#each jobs as job (job.id)}
                <Card {job} />
            {/each}
        </div>
    </main>
</div>