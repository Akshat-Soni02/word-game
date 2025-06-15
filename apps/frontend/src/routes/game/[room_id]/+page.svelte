<script lang="ts">
	import * as InputOTP from "$lib/components/ui/input-otp/index.js";
	import { REGEXP_ONLY_CHARS } from 'bits-ui';
	import Timer from '$lib/components/Timer.svelte';
	import { socket } from "$lib/stores/socket";
	import { SocketChannels, SocketMessages } from "$lib/constants/states";
	import { page } from "$app/state";
	import type { GuessedCorrectWordAndGameEndMessage, GuessedCorrectWordMessage, NoCorrectLetterMessage, SomeCorrectLettersMessage, SomeoneGuessedCorrectWordAndGameEndMessage, SomeoneGuessedCorrectWordMessage, TimerEndMessage } from "$lib/constants/types";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";
	import AudioPlayer from "$lib/components/AudioPlayer.svelte";

	let { room_id } = page.params;
	let guessed_word = $state('');
	let play_sound = $state(false);
	let sound_type = $state("default");

	let feedbacks: (string | null)[] = Array(5).fill(null);
	let feedbackMap: Map<number, { letter: string; shownAt: number }> = new Map();
	let blockedMap: Map<number, boolean> = new Map();
	let redrawKey = $state(0);

	function handleMatches(matches: { letter: string; index: number }[]) {
		const now = Date.now();
		matches.forEach(({ letter, index }) => {
			if (!blockedMap.get(index)) {

				feedbacks[index] = letter;
				// feedbackMap.set(index, { letter, shownAt: now });
				blockedMap.set(index, true);

				console.log(`hitting ${letter} on index - ${index}`);

				// Remove feedback after 5 seconds
				setTimeout(() => {
					// feedbackMap.delete(index);
					feedbacks[index] = null;
				}, 5000);

				// We can Unblock the index after 6 seconds as well
				// setTimeout(() => {
				// 	blockedMap.set(index, false);
				// }, 6000);
			}
		});
		redrawKey += 1;
	}

	function resetFeedbackCycle() {
		// feedbackMap.clear();
		feedbacks.forEach((feed) => {
			feed = null;
		});
		blockedMap.clear();
	}

	function onComplete() {
		handleWordHitEmit();
		guessed_word = '';
	}

	function handleWordHitEmit() {
      $socket?.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
        type: SocketMessages.WORD_HIT,
        payload: { word: guessed_word, room_id }
      }));
    }

	function handleTimerEndEmit() {
      $socket?.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
        type: SocketMessages.TIMER_END,
        payload: { room_id }
      }));
    }

	$effect(() => {
      if($socket) {
        $socket.on(SocketChannels.DEFAULT_CHANNEL, (data, callback) => {
            const message: NoCorrectLetterMessage | SomeCorrectLettersMessage | GuessedCorrectWordMessage | SomeoneGuessedCorrectWordMessage | GuessedCorrectWordAndGameEndMessage | SomeoneGuessedCorrectWordAndGameEndMessage | TimerEndMessage = JSON.parse(data.toString());

            if(message) {
                switch (message.type) {
                  case SocketMessages.NO_CORRECT_LETTER:
                    toast(`nope..`);
                    break;

                  case SocketMessages.CORRECT_LETTERS:
					// show indication of correct letter
					handleMatches(message.payload.matches);
                    break;

                  case SocketMessages.CORRECT_WORD_GUESS:
					resetFeedbackCycle();
					sound_type = "default";
					play_sound = true;
					setTimeout(() => {
						play_sound = false;
					}, 100);
					toast.success('Bingo! you guessed it');
                    break;

                  case SocketMessages.CORRECT_WORD:
					resetFeedbackCycle();
                    toast(`${message.payload.player_name} guessed it - ${message.payload.correct_word}`);
					guessed_word = '';
                    break;

				  case SocketMessages.CORRECT_WORD_GUESS_GAME_END:
					resetFeedbackCycle();
					sessionStorage.setItem('players', JSON.stringify(message.payload.players));
                    toast(`Bingo! you guessed it`);
					goto(`/game/${room_id}/scores`);
                    break;

				  case SocketMessages.CORRECT_WORD_GAME_END:
					resetFeedbackCycle();
					sessionStorage.setItem('players', JSON.stringify(message.payload.players));
                    toast(`${message.payload.player_name} guessed it - ${message.payload.correct_word}`);
					goto(`/game/${room_id}/scores`);
                    break;

				  case SocketMessages.TIMER_ENDED:
					sessionStorage.setItem('players', JSON.stringify(message.payload.players));
					sound_type = "time_end";
					play_sound = true;
					setTimeout(() => {
						play_sound = false;
					}, 100);
                    toast(`Time's Up, the word was ${message.payload.correct_word}`);
					goto(`/game/${room_id}/scores`);
                    break;
                
                  default:
                    break;
                }
            }
        })
      }
    })
</script>


<AudioPlayer play = {play_sound} soundType = {sound_type}/>


<!-- TIMER HEADER -->
<div class="page-header">
	<h2 class="timer-head">Time Left:</h2>
	<Timer duration = {120} onComplete = {handleTimerEndEmit} />
</div>

<!-- WORD INPUT SECTION -->
<div class="otp-wrapper">
	<div class="otp-feedback" id="otp-feedback"></div>

	<InputOTP.Root maxlength={5} pattern={REGEXP_ONLY_CHARS} bind:value = {guessed_word} {onComplete}>
		{#snippet children({ cells })}
			<InputOTP.Group class="flex justify-center flex-wrap gap-5 sm:gap-4 relative">
				{#key redrawKey}
					{#each cells.slice(0, 6) as cell, i}
						<div class="relative flex flex-col items-center">
							<!-- Feedback Letter -->
							{#if feedbacks[i]}
								<div
									class="absolute -top-[5.5rem] w-[clamp(3rem,8vw,5rem)] h-[clamp(3rem,8vw,5rem)] flex items-center justify-center text-[clamp(1.5rem,4vw,2rem)] font-semibold bg-green-500 text-white rounded-lg shadow-md fade-in-out transition-all duration-300"
								>
									{feedbacks[i]}
								</div>
							{/if}
				
							<!-- Input Box -->
							<InputOTP.Slot
								{cell}
								class="w-[clamp(3.5rem,9vw,5rem)] h-[clamp(3.5rem,9vw,5rem)] text-[clamp(2rem,5vw,2.5rem)] text-center font-semibold text-[#a9a9a9] border-2 border-[#b3afa7] bg-[#fdfaf5] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b3afa7]/40 transition-all duration-150 font-[Segoe UI]"
							/>
						</div>
					{/each}
				{/key}
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

	.fade-in-out {
		animation: fadeout 5s forwards;
	}

	@keyframes fadeout {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
