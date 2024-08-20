<script>
    import { app } from '../store.js'

    export let title
    function goToHome() {
        $app.page = 'home'
    }
</script>

<header class="bg-gray-950 px-12 py-8">
    <div class="animate-up text-white font-semibold flex items-center">
        <button 
            on:click={goToHome}
        >
            <img src="/images/back.svg" alt="" />
        </button>
        <h1 class="mx-auto">{title}</h1>
    </div>
</header>
