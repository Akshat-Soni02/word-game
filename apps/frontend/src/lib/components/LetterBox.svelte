<script>
    let val = $state('');
</script>


<input class="letter-box" type="text" bind:value={val} onsubmit={() => console.log(val)}>


<style>
    .letter-box {
        width: 3rem;
        height: 3rem;
        border-radius: 10px;
        font-size: 2rem;
        text-align: center;
    }
</style>