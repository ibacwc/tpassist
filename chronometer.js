let hours = 0;
let minutes = 0;
let seconds = 0;
let centiseconds = 0;
let going = false;
let loop;
const time_para = document.getElementById("time-display");
const btn = document.getElementById("timer-button");

function wrap(value, min, max){
	return (value > max ) ? min : (value < min) ? max : value;
}

function start_stopwatch(){
	if (!going){
		loop = setInterval(function (){
			centiseconds += 1;
			if (centiseconds != wrap(centiseconds, 0, 99)){
				centiseconds = wrap(centiseconds, 0, 99);
				seconds += 1;
			}
			if (seconds != wrap(seconds, 0, 59)){
				seconds = wrap(seconds, 0, 59);
				minutes += 1;
			}
			if (minutes != wrap(minutes, 0, 59)){
				minutes = wrap(minutes, 0, 59);
				hours += 1;
			}
			let csd = (centiseconds < 10) ? `0${centiseconds}` : `${centiseconds}`;
			let sd = (seconds < 10) ? `0${seconds}` : `${seconds}`;
			let md = (minutes < 10) ? `0${minutes}` : `${minutes}`;
			let hd = (hours < 10) ? `0${hours}` : `${hours}`;
			time_para.innerHTML = `${hd}:${md}:${sd}:${csd}`;
		}, 10);
		btn.innerHTML = "Stop"
	}else{
		clearInterval(loop);
		centiseconds, seconds, minutes, hours = 0;
		time_para.innerHTML = '00:00:00:00';
		btn.innerHTML = 'Start';

	}
	going = !going
}
