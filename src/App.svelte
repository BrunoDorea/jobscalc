<!-- TODO: Layout mobile -->
<script>
    import "./app.css"
    import Home from "./home/Home.svelte"
    import Profile from "./profile/Profile.svelte"
    import Project from "./project/Project.svelte"
    import { app } from './store.js'
</script>

{#if $app.page === 'home'}
    <Home />
{:else if $app.page === 'profile'}
    <Profile />
{:else if $app.page === 'project'}
    <Project />
{/if}
