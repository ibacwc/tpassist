let set_input = document.createElement('input');
let existing_exercises = new Map();

const exc_container = document.getElementById('exercise-container');
const input = document.getElementById("exercise-input");
const ul = document.getElementById("exercises");
let li;
let mouse="";
let lut_exercises = {
	chest: ["Push ups", "Dips", "Ring flies"],
	shoulders: ["Handstand push ups", "Pseudo push ups", "Pike push ups", "Rear delt flies", "Facepulls"],
	back: ["Pull ups", "Chin ups", "Rows"],
	biceps: ["Pelican curls", "Bicep curls"],
	triceps: ["Diamond push ups", "Sphinx push ups"],
	legs: ["Squat", "Pistol squat", "Knee bends", "Sissy squat", "Shrimp squat", "Nordic curl", "Glute bridges", "Calf raises"]
};


function clamp(value, min, max){
	return (value < min) ? min : (value > max) ? max : value;
}
function activate_input(){
	if(ul.style.display == "none"){
		ul.style.display = 'block';
	}
}
function deactivate_input(){
	if(ul.style.display=="block" && mouse != "li"){
		ul.style.display='none';
	}
}
function start(){
	set_input.classList.add("set");
	set_input.setAttribute('type', 'number');
	
	ul.style.display = "none";

	input.addEventListener('focusin', activate_input);
	input.addEventListener('focusout', deactivate_input);
	input.addEventListener('click', activate_input);
	
	for(let category in lut_exercises){
		lut_exercises[category].forEach(element => {
			let tmp = document.createElement("li");
			tmp.value = element;
			tmp.innerHTML = element;
			tmp.muscles_worked = category;
			ul.appendChild(tmp);
		});
	}

	li = document.getElementsByTagName('li');
	for(let i =0; i< li.length;++i){
		li[i].addEventListener('click', function (){
			input.value = li[i].innerHTML;
			ul.style.display = "none";
		});
		li[i].addEventListener('mouseover', function(){mouse="li"});
		li[i].addEventListener('mouseout', function(){mouse=""});
	}
	check_storage();
}


function add_set(div){
	let sets_container = div.querySelector('.sets-container');
	sets_container.appendChild(set_input.cloneNode(true));
}
function rm_set(div){
	let sets_container = div.querySelector('.sets-container');
	let sc_len = sets_container.children.length
	if (sc_len > 1){
		sets_container.removeChild(sets_container.children[sc_len - 1])
	}else{
		existing_exercises.delete(sets_container.parentNode.parentNode.id);
		sets_container.parentNode.parentNode.remove();
	}
}
function calc_stats(){
	let exercises = document.getElementsByClassName("exercise");
	let stats_cont = document.getElementById("stats");
	stats_cont.innerHTML = "<p>This workout you've done:<p>";
	for(let i =0; i<exercises.length; ++i){
		let exc = exercises[i];
		let exc_name = exc.id;
		let reps_done = 0;
		let rep_boxes = exc.getElementsByClassName("sets-container")[0].children;
		for (let j=0; j<rep_boxes.length; ++j){
			let rta = parseInt(rep_boxes[j].value, 0);
			if (rta !== rta){ //MURDER JS
				continue;
			}
			rta = clamp(rta, 0, rta);
			rep_boxes[j].value=rta;
			reps_done += rta;
		}
		let p = document.createElement("p");
		p.innerHTML = `${exc_name} for ${reps_done} rep`;
		if(reps_done != 1){
			p.innerHTML+='s';
		}
		stats_cont.append(p);
	}
	if(stats_cont.children.length <= 2){
		stats_cont.innerHTML += "<p>Nothing!</p>";
	}
	window.location.href='#stats';
}
function add_exercise(exc){
	if(exc ==""){
		return;
	}
	if (existing_exercises.get(exc)){
		let tmp = existing_exercises.get(exc);
		tmp.classList.add("flash");
		tmp.addEventListener("animationend", function(e) {
			tmp.classList.remove("flash");
		})
		return;
	}
	let exc_div = document.createElement('div');
	exc_div.classList.add('exercise');
	exc_div.innerHTML = 
	
	'<div class="info">\
		<div class="sets-container">\
		<input class="set" type="number" min="0">\
	</div>\
	</div>\
		<div class="column">\
			<button onclick="add_set(this.parentNode.parentNode)">Add Set</button>\
			<button onclick="rm_set(this.parentNode.parentNode)">Delete Set</button>\
		</div>\
	</div>';
	exc_div.setAttribute("id", exc)
	let paragraph = document.createElement('p');
	paragraph.textContent= exc;
	exc_div.firstChild.prepend(paragraph);
	const main = document.getElementById('main');
	main.appendChild(exc_div);
	existing_exercises.set(exc, exc_div);

}
function check_storage(){
	if(typeof(Storage) == "undefined"){
		alert("No web storage support!! You can use this site, but you can't save your progress.");
	}
}

//The thief who has no oppertunity to steal thinks he is an honest man...
function find_exercise(){
	let filter = input.value.toUpperCase();
	for (let i = 0; i< li.length; ++i){
		let txt_val = li[i].innerHTML;
		if(txt_val.toUpperCase().indexOf(filter) > -1){ 
			li[i].style.display="";
		}else{
			li[i].style.display="none";
		}
	}
}
function select_exercise(exc){
	input.value = exc.innerHTML;
}