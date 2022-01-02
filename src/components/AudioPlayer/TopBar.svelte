<script>
	import CloseIcon from './icons/close.svg';
</script>

<div class="music-app-top-bar">
	<span>HACKER FM RADIO</span>
	<span class="close-app"> <CloseIcon /> </span>
</div>

<style>
	.music-app-top-bar {
		display: flex;
		justify-content: space-between;
		cursor: grab;
		background-color: gray;
		width: 100%;
	}

	.close-app {
		width: 20px;
		cursor: pointer;
	}

	.close-app:hover {
		color: #a11010;
	}
</style>
