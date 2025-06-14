<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		background-color: #F9F3E8;
		color: #171717;
		margin: 0;
		font-family: system-ui, sans-serif;
		padding: 15px;
	}

	:global(button) {
		outline: none;
		border-radius: 10px;
		cursor: pointer;
	}
</style>