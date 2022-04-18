<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const date = new Date();
		const time = document.querySelector('.time');
		time.innerHTML = date.toLocaleTimeString();
		const updateTime = () => {
			time.innerHTML = new Date().toLocaleTimeString();
			window.requestAnimationFrame(updateTime);
		};
		updateTime();
		const dateElement = document.querySelector('.date');
		// current day
		const day = date.getUTCDate();
		// current month
		const month = date.getMonth() + 1;
		const futuristicYear = date.getFullYear() + 1000;
		dateElement.innerHTML = `${day}-${month}-${futuristicYear}`;
	});
</script>

<header class="header-container">
	<div class="logo">H4CKER.FM v0.1.0</div>

	<div class="date-time-container">
		<div class="date" />
		<span> | </span>
		<div class="time" />
	</div>
</header>

<style>
	.header-container {
		display: flex;
		color: white;
		justify-content: space-between;
		font-size: 1rem;
	}
	.date-time-container {
		display: flex;
		color: white;
		gap: 5px;
	}
	.time {
		color: white;
	}
</style>
