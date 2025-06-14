<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { toast } from 'svelte-sonner';
	import { SocketChannels, SocketMessages } from "$lib/constants/states";
	import type { CreatedRoomMessage, JoinedRoomMessage } from "$lib/constants/types";
    import { socket } from "$lib/stores/socket";
    let showModal = $state(false);
    let player_name = $state('');
    let play_state: 'create-room' | 'join-room' | null = $state(null);
    let join_room_id = $state('');

    let socket_emit_payload = $derived(play_state === 'create-room' ? { player_name } : { player_name, room_id: join_room_id })
    let socket_emit_type = $derived(play_state === 'create-room' ? SocketMessages.CREATE_ROOM : SocketMessages.JOIN_ROOM);

    const open = () => showModal = true;
    const close = () => showModal = false;

    function handleRedirectOnSuccess(data: any) {
        if(play_state === 'join-room') toast('Room Joined');
        sessionStorage.setItem('players', JSON.stringify(data.players));
        goto(`/room-lobby/${play_state === 'create-room' ? data.room_id : join_room_id}`);
    }

    function handleSocketEmit() {
        $socket?.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
            type: socket_emit_type,
            payload: socket_emit_payload
        }));
    }

    $effect(() => {
        if($socket) {
            $socket.on(SocketChannels.DEFAULT_CHANNEL, (data, callback) => {
                const message: CreatedRoomMessage | JoinedRoomMessage = JSON.parse(data.toString());
                if(message && ( message.type === SocketMessages.ROOM_CREATED || message.type === SocketMessages.ROOM_JOINED)) {
                    handleRedirectOnSuccess(message.payload);
                }
            });
        }
    })
</script>

{#snippet modal_body()}
    {#if play_state === 'create-room'}
        <div class="modal_body">
            <p class="modal_body_text">Enter player name</p>
            <input type="text" id="player_name" bind:value={player_name} class="player_name_input"/>
        </div>
    {:else}
        <div class="modal_body">
            <p class="modal_body_text">Enter player name</p>
            <input type="text" id="player_name" bind:value={player_name} class="player_name_input"/>
            <p class="modal_body_text">Enter room id</p>
            <input type="text" id="join_room_id" bind:value={join_room_id} class="player_name_input"/>
        </div>
    {/if}
{/snippet}

{#snippet modal_button()}
    <button class="modal_button" onclick={() => handleSocketEmit()}>Play</button>
{/snippet}


<div class="page-container">
    <h1 class="game-heading">Word Game</h1>
    <div class="button-container">
        <button class="create-room-button" onclick={() => {play_state = 'create-room'; open()}}>Create Room</button>
        <button class="join-room-button" onclick={() => {play_state = 'join-room'; open()}}>Join Room</button>
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
