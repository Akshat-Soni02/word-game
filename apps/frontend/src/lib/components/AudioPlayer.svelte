<script>
    let { play = false, soundType = "default" } = $props();
    
    let audioElement = $state();

    function playSound () {
        audioElement && audioElement.play();
    }

    function handleAudioEndEvent () {
        play = false;
    }

    $effect(() => {
        if(play) playSound();
    });
</script>


<audio src={`/sounds/${soundType}.mp3`} bind:this={audioElement} preload="auto" onended={handleAudioEndEvent}></audio>