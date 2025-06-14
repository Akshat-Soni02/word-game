<script lang="ts">
    import { Files } from 'lucide-svelte';
  
    let room_id = $state('abc910');
    let isRoomCreator = $state(true);
    const players = [
      { player_name: 'ramu', player_points: 0 },
      { player_name: 'shyamu', player_points: 0 },
      { player_name: 'jetha', player_points: 0 },
      { player_name: 'popat', player_points: 0 },
      { player_name: 'sodhi', player_points: 0 },
      { player_name: 'babita', player_points: 0 },
      { player_name: 'daya', player_points: 0 }
    ];
  
    function copyToClipboard() {
      navigator.clipboard.writeText(room_id)
        .then(() => console.log('Copied:', room_id))
        .catch(err => console.error('Copy failed:', err));
    }
  
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') copyToClipboard();
    }
  </script>
  
  <div class="page-container">
    <div class="page-header">
      <button class="lobby-action lobby-exit">Exit Room</button>
  
      <div class="room-id-wrapper">
        <h3 class="room-id-label">Room ID</h3>
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
                <div class="avatar-placeholder">
                {player.player_name.charAt(0).toUpperCase()}
                </div>
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
      border-width: 1px;
    }
  
    .lobby-exit {
      background-color: #EF4545;
      border-color: #b93333;
      border-width: 1px;
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
    padding: 0.5rem;
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