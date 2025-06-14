<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    let showModal = $state(false);
    let player_name = $state('');

    const open = () => showModal = true;
    const close = () => showModal = false;
</script>

{#snippet modal_body()}
    <div class="modal_body">
        <p class="modal_body_text">Enter player name</p>
        <!-- <p>{player_name}</p> -->
        <input type="text" id="player_name" bind:value={player_name} class="player_name_input"/>
    </div>
{/snippet}

{#snippet modal_button()}
    <button class="modal_button" onclick={() => alert('Confirmed')}>Play</button>
{/snippet}


<div class="page-container">
    <h1 class="game-heading">Word Game</h1>
    <div class="button-container">
        <button class="create-room-button" onclick={open}>Create Room</button>
        <button class="join-room-button" onclick={open}>Join Room</button>
    </div>

    {#if showModal}
        <Modal {modal_body} {modal_button} onClose={close}/>
    {/if}
</div>

<style>
    :global(body) {
		/* applies to <body> */
		margin: 0;
        padding: 0;
	}

    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20vh;
    }

    .game-heading {
        color: #171717;
        margin-top: 1rem;
        font-size: 3rem;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        width: 70%;
        max-width: 300px;
        gap: 0.5rem;
    }

    .create-room-button {
        background-color: #21C55E;
        padding: 0.5rem;
        font-size: 1.7rem;
        color: white;
        border-color: #199948;
        border-width: 2px;
        font-family: system-ui, sans-serif;
        font-weight: 700;
    }

    .join-room-button {
        background-color: #EAB30F;
        border-color: #B78B06;
        padding: 0.5rem;
        font-size: 1.7rem;
        color: white;
        font-family: system-ui, sans-serif;
        font-weight: 700;
        border-width: 2px;
    }

    .modal_body {
        /* padding: 0 0 0.5rem 0; */
        margin: 0.2rem 0 0.7rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .modal_body_text {
        font-size: 1.5rem;
        font-weight: 500;
        font-family: system-ui, sans-serif;
    }

    .modal_button {
        background-color: #EF4545;
        border-color: #B93333;
        border-width: 2px;
        padding: 0.5rem;
        font-size: 1.7rem;
        color: white;
        font-family: system-ui, sans-serif;
        font-weight: 700;
    }

    .player_name_input {
        font-size: 1.5rem;
        border-radius: 10px;
        padding: 0.7rem;
        text-align: center;
        border-width: 3px;
    }
</style>
