let set_input = document.createElement('input');
set_input.classList.add("set");
set_input.setAttribute('type', 'text');

function add_set(div){
	let sets_container = div.querySelector('.sets-container');
	sets_container.appendChild(set_input.cloneNode(true));
}
function rm_set(div){
	let sets_container = div.querySelector('.sets-container');
	let sc_len = sets_container.children.length
	if (sc_len > 1){
		sets_container.removeChild(sets_container.children[sc_len - 1])
	}
}
function calc_stats(){
	let exercises = document.getElementsByClassName("exercise");
	for(let i =0; i<exercises.length; ++i){
		let exc = exercises[i];
		let exc_name = exc.id;
		let reps_done = 0;
		let rep_boxes = exc.getElementsByClassName("sets-container")[0].children;
		for (let j=0; j<rep_boxes.length; ++j){
			let rta = parseInt(rep_boxes[j].value, 0);
			if (rta !== rta){
				continue;
			}
			reps_done += rta;
			
		}
		console.log(`did ${exc_name} for ${reps_done} reps`)
	}
}
function add_exercise(exc){
	let exc_div = document.createElement('div');
	exc_div.classList.add('exercise');
	exc_div.innerHTML = '<div class="sets-container">\
                <input class="set" type="text">\
            </div>\
            <div class="column">\
                <button onclick="add_set(this.parentNode.parentNode)">Add Set</button>\
                <button onclick="rm_set(this.parentNode.parentNode)">Delete Set</button>\
            </div>';
	exc_div.setAttribute("id", exc)
	let paragraph = document.createElement('p');
	paragraph.textContent= exc;
	exc_div.insertBefore(paragraph, exc_div.firstChild);
	const main = document.getElementById('main');
	main.appendChild(exc_div);

}