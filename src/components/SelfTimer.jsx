import React from 'react'

function SelfTimer() {
	
	function startTimer() {
		const duration = 3;

		let timer = duration, seconds;

		setInterval(function () {
			seconds = parseInt(timer % 60, 10);
			/* seconds = seconds < 10 ? "0" + seconds : seconds; */
	
			/* display.textContent = minutes + ":" + seconds; */
			return seconds
		}, 1000);
	}


	return (
		<span id="self-timer-elem">{startTimer}</span>
	)
}

export default SelfTimer
