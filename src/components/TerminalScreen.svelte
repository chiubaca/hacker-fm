<script lang="ts">
	let isHidden: boolean = false;

	function toggleHidden() {
		isHidden = true;
	}
</script>

<main hidden={isHidden} on:click={toggleHidden}>
	<div class="terminal">Press any key to continue</div>
</main>

<style>
	.terminal {
		height: 100vh;
		color: green;
		background-color: black;
	}
</style>
