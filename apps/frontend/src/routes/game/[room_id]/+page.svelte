<script lang="ts">
	import * as InputOTP from "$lib/components/ui/input-otp/index.js";
	import { REGEXP_ONLY_CHARS } from 'bits-ui';
	import Timer from '$lib/components/Timer.svelte';
</script>

<!-- TIMER HEADER -->
<div class="page-header">
	<h2 class="timer-head">Time Left:</h2>
	<Timer />
</div>

<!-- OTP INPUT SECTION -->
<div class="otp-wrapper">
	<!-- (You can show feedback here when needed) -->
	<div class="otp-feedback" id="otp-feedback"></div>

	<InputOTP.Root maxlength={5} pattern={REGEXP_ONLY_CHARS}>
		{#snippet children({ cells })}
			<InputOTP.Group class="otp-inputs">
				{#each cells.slice(0, 6) as cell}
					<InputOTP.Slot {cell} class=""/>
				{/each}
			</InputOTP.Group>
		{/snippet}
	</InputOTP.Root>
</div>

<style>

	.page-header {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
		z-index: 10;
	}

	.timer-head {
		font-size: 1.5rem;
		color: #1f1f1f;
		text-shadow: 0 1px 0 #ffd966;
		margin: 0;
	}

	.otp-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding-top: 4rem;
		box-sizing: border-box;
		gap: 2rem;
	}

	.otp-feedback {
		min-height: 2rem;
		font-size: 1.1rem;
		font-weight: 600;
		text-align: center;
		color: #e63946;
	}

	.otp-inputs {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	.otp-slot {
		width: 5rem;
		height: 5rem;
		font-size: 2.5rem;
		text-align: center;
		border: 3px solid #ffc857;
		border-radius: 1rem;
		background-color: #fff7eb;
		box-shadow: 0 0 10px rgba(255, 200, 87, 0.2);
		transition: all 0.2s;
	}

	.otp-slot:focus {
		outline: none;
		border-color: #ffb347;
		box-shadow: 0 0 15px rgba(255, 183, 0, 0.4);
	}

	@media screen and (max-width: 600px) {
		.otp-slot {
			width: 4rem;
			height: 4rem;
			font-size: 2rem;
		}

		.page-header {
			top: 0.5rem;
		}
	}
</style>
