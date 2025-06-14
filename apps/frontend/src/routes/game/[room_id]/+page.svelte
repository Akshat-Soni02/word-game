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
			<InputOTP.Group class="flex justify-center flex-wrap gap-5 sm:gap-4">
				{#each cells.slice(0, 6) as cell}
				<InputOTP.Slot
					{cell}
					class="w-20 h-20 text-4xl text-center font-semibold text-[#a9a9a9] border-2 border-[#b3afa7] bg-[#fdfaf5] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b3afa7]/40 transition-all duration-150 font-[Segoe UI]"
				/>
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

	@media screen and (max-width: 600px) {
		.page-header {
			top: 0.5rem;
		}
	}
</style>
