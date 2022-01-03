<script lang="ts">
	import AudioPlayer from '$components/AudioPlayer/AudioPlayer.svelte';
	import TerminalScreen from '$components/TerminalScreen.svelte';

	let isTerminalHidden: boolean = false;

	function hideTerminal() {
		isTerminalHidden = true;
	}
</script>

{#if isTerminalHidden}
	<main class="desktop">
		<div class="crt-overlay-effect" />
		<AudioPlayer />
	</main>
{:else}
	<main on:click={hideTerminal} on:keydown={hideTerminal}>
		<TerminalScreen />
	</main>
{/if}

<style scoped>
	.desktop {
		background-color: lightgrey;
		height: 100vh;
		background-image: url('/assets/background-1.jpg');
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
