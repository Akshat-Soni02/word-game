<script>
    import { page } from "$app/state";
    import Button from "$lib/components/ui/button/button.svelte";

    let { room_id } = page.params;
    const players = [
      { player_name: 'ramu', player_points: 10 },
      { player_name: 'shyamu', player_points:4 },
      { player_name: 'jetha', player_points: 6 },
      { player_name: 'popat', player_points: 0 },
      { player_name: 'sodhi', player_points: 7 },
      { player_name: 'babita', player_points: 1 },
      { player_name: 'daya', player_points: 11 }
    ];
</script>

<div class="page-container">

    <div class="page-header">
        <Button>Home</Button>
    </div>

    <div class="players-section">
        <h2 class="players-title">Scores</h2>
        <div class="players-grid">
            {#each players as player}
            <div class="player-card">
                <div class="avatar-placeholder">
                {player.player_points}
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
</style>