<script lang="ts">
	import { onMount } from 'svelte';

	let { duration = 60, onComplete = () => console.log("⏰ Time's up!") } = $props();

	let timeLeft = $derived(duration);
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				clearInterval(interval);
				onComplete();
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	let bubbleColor = $derived(timeLeft > 30
		? '#21C55E' // Green
		: timeLeft > 10
		? '#ffc857' // Yellow
		: '#EF4545') // Red
</script>

<div class="timer-container">
	<div class="countdown-bubble" style="border-color: {bubbleColor}; box-shadow: 0 0 10px {bubbleColor}; color: {bubbleColor}">
		{timeLeft}
	</div>

	{#if timeLeft === 0}
		<!-- <p class="finished-text">⏳ Time's Up!</p> -->
	{/if}
</div>

<style>
	.timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 1rem;
		background-color: transparent;
		font-family: 'Orbitron', 'Segoe UI', sans-serif;
	}

	.countdown-bubble {
		/* background: #1e1e1e; */
		border: 2px solid;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-weight: 600;
        font-family: system-ui, sans-serif;
		transition: all 0.4s ease-in-out;
		animation: pulse 1s infinite ease-in-out;
	}

	/* .finished-text {
		margin-top: 0.75rem;
		color: #EF4545;
		font-size: 1.25rem;
		font-weight: 700;
		animation: flash 1s infinite alternate;
	} */

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.08);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes flash {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.4;
		}
	}

	@media (max-width: 600px) {
		.countdown-bubble {
			width: 50px;
			height: 50px;
			font-size: 1.5rem;
		}
	}
</style>