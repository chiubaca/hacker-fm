<script lang="ts">
	import AudioPlayer from '$components/AudioPlayer/AudioPlayer.svelte';
	import TerminalScreen from '$components/TerminalScreen.svelte';

	let isTerminalHidden: boolean = false;

	function toggleHidden() {
		isTerminalHidden = true;
	}
</script>

{#if isTerminalHidden}
	<main class="desktop">
		<div class="crt-overlay-effect" />
		<AudioPlayer />
	</main>
{:else}
	<main on:click={toggleHidden}>
		<TerminalScreen />
	</main>
{/if}

<style scoped>
	@import '../styles/global.css';

	.desktop {
		background-color: lightgrey;
		height: 100vh;
		background-image: url('/assets/background-1.jpg');
		background-size: cover;
		background-repeat: no-repeat;
	}

	.crt-overlay-effect {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-image: repeating-linear-gradient(
			rgba(0, 0, 0, 0.3) 0,
			transparent 1px,
			transparent 2px,
			rgba(0, 0, 0, 0.3) 3px
		);
		pointer-events: none;
		z-index: 1;
	}
</style>
