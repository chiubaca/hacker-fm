// convert seconds to minutes and seconds

export function secondsToMinsAndSecs(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = Number((seconds % 60.0).toFixed(0));

	return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
}
