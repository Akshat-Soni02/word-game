<script lang="ts">
	import { page } from '$app/state';
    import LetterBox from '$lib/components/LetterBox.svelte';

	const room_id = $derived(page.params.room_id);
</script>

<p>Currently at {room_id}</p>

<div class="word-input-container">
    <LetterBox/>
    <LetterBox/>
    <LetterBox/>
    <LetterBox/>
    <LetterBox/>
</div>

<style>
    .word-input-container {
        display: flex;
        gap: 0.2rem;
    }
</style>