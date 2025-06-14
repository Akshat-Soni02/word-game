<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		background-color: #f9f3e8;
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
