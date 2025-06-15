<script lang="ts">

    import Modal from "$lib/components/Modal.svelte";
	import { SocketChannels, SocketMessages } from "$lib/constants/states";
	import type { CreatedRoomMessage, JoinedRoomMessage } from "$lib/constants/types";
    import { socket } from "$lib/stores/socket";

	import { goto } from "$app/navigation";
    import { toast } from 'svelte-sonner';

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
        sessionStorage.setItem('player_name', JSON.stringify(player_name));
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
    <div class="tile-row">
        <div class="letter-tile correct">W</div>
        <div class="letter-tile present">O</div>
        <div class="letter-tile wrong">R</div>
        <div class="letter-tile">D</div>
        <div class="letter-tile">S</div>
    </div>
    <!-- <h1 class="game-heading">Word Game</h1> -->
    <div class="button-container">
        <button class="create-room-button" onclick={() => {play_state = 'create-room'; open()}}>Create Room</button>
        <button class="join-room-button" onclick={() => {play_state = 'join-room'; open()}}>Join Room</button>
    </div>

    <!-- how to play section -->
    <section class="how-it-works-container">
        <h2 class="how-it-works-heading">How It Works</h2>
        <div class="how-it-works-content">
            <div class="step-card">
                <h3 class="step-title">1. Create or Join a Room</h3>
                <p class="step-text">
                    Choose a mode and set your player name. Friends can join using the room code.
                </p>
            </div>
    
            <div class="step-card">
                <h3 class="step-title">2. Start the Game</h3>
                <p class="step-text">
                    A countdown starts — get ready!
                </p>
            </div>
    
            <div class="step-card">
                <h3 class="step-title">3. Guess the Word</h3>
                <p class="step-text">
                    Type your guess. Hints (correct letters in correct spots) are shared in real-time with everyone.
                </p>
            </div>
    
            <div class="step-card">
                <h3 class="step-title">4. Score & Progress</h3>
                <p class="step-text">
                    Be the first to guess the word and earn a point. The game moves to the next word for all players.
                </p>
            </div>
    
            <div class="step-card">
                <h3 class="step-title">5. Win the Game</h3>
                <p class="step-text">
                    When time runs out or the word pool is over, scores are tallied and the final leaderboard is shown!
                </p>
            </div>
        </div>
    </section>
    
    

    {#if showModal}
        <Modal {modal_body} {modal_button} onClose={close}/>
    {/if}
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20vh;
    }

    .tile-row {
        display: flex;
        gap: 0.5rem;
    }

    .letter-tile {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 2rem;
        font-weight: bold;
        background-color: #fdfaf5;
        color: #171717;
        border: 2px solid #b3afa7;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: transform 0.3s ease;
    }

    /* Feedback states */
    .letter-tile.correct {
        background-color: #21C55E;
        color: white;
        border-color: #199948;
    }

    .letter-tile.present {
        background-color: #EAB30F;
        color: white;
        border-color: #B78B06;
    }

    .letter-tile.wrong {
        background-color: #EF4545;
        color: white;
        border-color: #B93333;
    }

    /* Small screens (phones) */
    @media (max-width: 480px) {
        .letter-tile {
            width: 2.8rem;
            height: 2.8rem;
            font-size: 1.5rem;
        }
    }

    /* Medium screens (tablets) */
    @media (min-width: 481px) and (max-width: 768px) {
        .letter-tile {
            width: 3.2rem;
            height: 3.2rem;
            font-size: 1.8rem;
        }
    }

    /* Large screens (default, desktops) */
    @media (min-width: 769px) {
        .letter-tile {
            width: 3.5rem;
            height: 3.5rem;
            font-size: 2rem;
        }
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



    /* how to play section */

    .how-it-works-container {
        width: 90%;
        max-width: 700px;
        padding: 1.5rem 1rem;
        margin-top: -5vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: fade-in 0.8s ease;
    }

    .how-it-works-heading {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #171717;
        font-family: system-ui, sans-serif;
        text-align: center;
    }

    .how-it-works-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .step-card {
        background-color: #fdfaf5;
        border: 2px solid #b3afa7;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s ease;
    }

    .step-card:hover {
        transform: scale(1.02);
    }

    .step-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
        color: #21C55E;
        font-family: system-ui, sans-serif;
    }

    .step-text {
        font-size: 1.05rem;
        font-family: system-ui, sans-serif;
        color: #444;
        line-height: 1.4;
    }

    @media (max-width: 500px) {
        .how-it-works-heading {
            font-size: 1.5rem;
        }

        .step-title {
            font-size: 1.1rem;
        }

        .step-text {
            font-size: 0.95rem;
        }
    }


</style>
