<script lang="ts">
    import { page } from '$app/state';
    import { Files } from 'lucide-svelte';
    import ToolTip from '$lib/components/ToolTip.svelte';
    import { toast } from 'svelte-sonner';
    import { socket } from '$lib/stores/socket';
	  import { SocketChannels, SocketMessages } from '$lib/constants/states';
	import type { SomeoneJoinedRoomMessage } from '$lib/constants/types';
  
    let { room_id } = page.params;
    let isRoomCreator = $state(true);

    const playersRaw = sessionStorage.getItem('players');
    let players = $derived(playersRaw ? JSON.parse(playersRaw) : []);

  
    function copyToClipboard() {
      navigator.clipboard.writeText(room_id)
        .then(() => console.log('Copied:', room_id))
        .catch(err => console.error('Copy failed:', err));
    }
  
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') copyToClipboard();
    }

    $effect(() => {
      if($socket) {
        $socket.on(SocketChannels.DEFAULT_CHANNEL, (data, callback) => {
            const message: SomeoneJoinedRoomMessage = JSON.parse(data.toString());
            if(message && message.type === SocketMessages.SOMEONE_JOINED) {
                sessionStorage.setItem('players', JSON.stringify(message.payload.players));
                players = message.payload.players;
                toast(`${message.payload.player_name} joined`);
            }
        })
      }
    })
  </script>
  
  <div class="page-container">
    <div class="page-header">
      <button class="lobby-action lobby-exit">Exit Room</button>
  
      <div class="room-id-wrapper">
        <h3 class="room-id-label">Room ID</h3>
        <ToolTip content='Copy'>
            <div
                class="room-id"
                role="button"
                tabindex="0"
                onclick={copyToClipboard}
                onkeydown={handleKeydown}
                aria-label="Copy Room ID"
                >
                <p class="room-id-text">{room_id}</p>
                <Files size={18} color="#b3afa7f8" />
            </div>
        </ToolTip>
      </div>
  
      {#if isRoomCreator}
        <button class="lobby-action lobby-start">Start Game</button>
      {/if}
    </div>
  
    <div class="players-section">
        <h2 class="players-title">Players in Room</h2>
        <div class="players-grid">
            {#each players as player}
            <div class="player-card">
                <div class="player-name">{player.player_name}</div>
            </div>
            {/each}
        </div>
    </div>
      
  </div>
  
  <style>
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
      max-width: 900px;
      margin: auto;
    }
  
    .page-header {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  
    .lobby-action {
      padding: 0.6rem 1rem;
      font-size: clamp(0.8rem, 2vw, 1.1rem);
      font-weight: 600;
      /* border: none; */
      border-radius: 6px;
      color: white;
      cursor: pointer;
    }
  
    .lobby-start {
      background-color: #21C55E;
      border-color: #199948;
      border-width: 2px;
    }
  
    .lobby-exit {
      background-color: #EF4545;
      border-color: #b93333;
      border-width: 2px;
    }
  
    .room-id-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }
  
    .room-id-label {
      font-size: clamp(0.9rem, 2vw, 1.4rem);
      margin: 0;
    }
  
    .room-id {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      border: 2px dotted #b3afa7f8;
      border-radius: 8px;
      cursor: pointer;
      font-size: clamp(0.8rem, 2vw, 1.2rem);
    }
  
    .room-id-text {
      color: grey;
      margin: 0;
    }
  
    .players-section {
    width: 100%;
    padding: 1rem;
    background-color: #fffaf2;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    color: #333;
    border: 1px solid #f0e8dc;
    }

    .players-title {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    color: #5f3e2d;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
    }

    .players-title::after {
    content: "";
    display: block;
    height: 3px;
    width: 60%;
    margin: 0.5rem auto 0;
    background: linear-gradient(to right, #f59e0b, #f43f5e);
    border-radius: 2px;
    }

    .players-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    }

    .player-card {
    background: #fef6ea;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid #eddcc0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    }

    .player-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #fbbf24;
    }

    /* let this be here for future */
    .avatar-placeholder {
    background-color: #fde68a;
    color: #5a3e2f;
    font-size: 1.4rem;
    font-weight: 700;
    width: 50px;
    height: 50px;
    margin: 0 auto 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #facc15;
    }

    .player-name {
    font-size: clamp(0.85rem, 2vw, 1.1rem);
    font-weight: 600;
    color: #4b3d31;
    }


  
    @media (max-width: 500px) {
      .page-header {
        flex-direction: column;
        align-items: stretch;
      }
  
      .room-id-wrapper {
        align-self: center;
      }
    }
  </style>  
