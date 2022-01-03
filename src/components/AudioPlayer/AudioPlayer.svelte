<script lang="ts">
	import Visualiser from './Visualiser.svelte';
	import TrackSeeker from './TrackSeeker.svelte';

	import { makeDraggable } from '$actions/draggable';
	import {
		currentTrack,
		setNextTrack,
		setPreviousTrack,
		paused,
		currentTime
	} from './audioPlayerStore';

	import PauseIcon from './icons/pause.svg';
	import PlayIcon from './icons/play.svg';
	import PreviousIcon from './icons/previous.svg';
	import NextIcon from './icons/next.svg';
	import TopBar from './TopBar.svelte';

	async function nextTrackHandler() {
		if (!$paused) {
			paused.set(true);
			await setNextTrack();
			paused.set(false);
		}
		if ($paused) {
			await setNextTrack();
		}
	}

	async function previousTrackHandler() {
		if (!$paused) {
			paused.set(true);
			await setPreviousTrack();
			paused.set(false);
		}
		if ($paused) {
			await setPreviousTrack();
		}
	}
</script>

<div class="app-container" use:makeDraggable>
	<TopBar />

	<div class="center">
		<div class="track">
			{$currentTrack.index} <br />
			{$currentTrack.name} <br />
		</div>

		<Visualiser />

		<TrackSeeker />

		<div class="controls">
			<button on:click={previousTrackHandler}>
				<PreviousIcon />
			</button>
			<button
				on:click={() => {
					paused.set($paused ? false : true);
				}}
			>
				{#if $paused}
					<PlayIcon />
				{:else}
					<PauseIcon />
				{/if}
			</button>
			<button on:click={nextTrackHandler}>
				<NextIcon />
			</button>
		</div>
	</div>
</div>

<style>
	.app-container {
		border: 1px solid #ccc;
		z-index: 9;
		position: absolute;
		width: 350px;
		background-color: black;
	}

	.track {
		color: green;
	}
	.controls button {
		/* reset button css */
		padding: 0;
		border: none;
		background: none;
		width: 30px;
		color: green;
		cursor: pointer;
	}

	.controls button:hover {
		color: lightgreen;
	}

	.controls {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 50px;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
