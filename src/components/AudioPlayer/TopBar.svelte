<script>
	import Close16 from 'carbon-icons-svelte/lib/Close16';
	import ChevronUp16 from 'carbon-icons-svelte/lib/ChevronUp16';
	import ChevronDown16 from 'carbon-icons-svelte/lib/ChevronDown16';

	export let minimised = false;

	function minimise() {
		minimised = minimised ? false : true;
	}
</script>

<div class="music-app-top-bar">
	<div>HACKER FM RADIO</div>
	<div class="app-controls">
		<button class="minimise-app" on:click={minimise}>
			{#if minimised}
				<ChevronDown16 />
			{:else}
				<ChevronUp16 />
			{/if}
		</button>
		<button class="close-app">
			<Close16 />
		</button>
	</div>
</div>

<style scoped>
	.music-app-top-bar {
		display: flex;
		justify-content: space-between;
		cursor: grab;
		background-color: gray;
		width: 100%;
	}

	.app-controls {
		display: flex;
		gap: 0.5rem;
		color: black;
		padding: 1px;
	}

	.minimise-app {
		height: 20px;
		/* width: 30px; */
	}
	.minimise-app:hover {
		color: orange;
	}

	.close-app {
		height: 20px;
	}

	.close-app:hover {
		color: #a11010;
	}
</style>
