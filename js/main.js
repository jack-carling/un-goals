import { getGoal } from './goal.js';

const goalsWrapper = document.getElementById('goals');
const URL = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false';

//Hämtar data från API
(async function getData() {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		displayGoals(data);
	} catch(error) {
		console.error(error);
		document.querySelector('.error').classList.add('show');
	}
})();

/*
Skapar ett div-element med class="goal"
Skapar ett p-element med titeln på målet
Skapar ett nummer för målet
Skapar en knapp med data-code som ett attribut som motsvarar målet
Ger knappen en eventlistener för att köra funktionen för mer information om målet
Funktionen för att visa ett specifikt mål ligger i en modulen goal.js
*/
function displayGoals(data) {
	for (let i = 0; i < data.length; i++) {
		let node = document.createElement('div');
		node.setAttribute('class', 'goal');
		let textNode = document.createElement('p');
		textNode.innerHTML = data[i].title;
		node.appendChild(textNode);
		let numberNode = document.createElement('span');
		numberNode.innerHTML = data[i].code;
		node.appendChild(numberNode);
		let buttonNode = document.createElement('button');
		buttonNode.setAttribute('data-code', data[i].code);
		buttonNode.innerHTML = 'Läs mer';
		node.appendChild(buttonNode);
		goalsWrapper.append(node);
		buttonNode.addEventListener('click', (event) => getGoal(event.target));
	}
}