const overlay = document.querySelector('.overlay');
const overlayHeader = document.querySelector('.overlay-info-header');
const overlayTitle = document.querySelector('.overlay-info-title');
const overlayText = document.querySelector('#info-text');
const closeButton = document.querySelector('#info-close');

/*
Hämtar data om ett specifikt mål
Vilket mål användaren vill visa ges genom attributet data-code
All brödtext läggs i en ny array infoText
Variablerna för nummer, titel och en kort beskrivning samt all brödtext skickas med i en funktion
*/
export async function getGoal(goal) {
	const goalNumber = goal.getAttribute('data-code');
	const goalURL = `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${goalNumber}/Target/List?includechildren=true`;
	const response = await fetch(goalURL);
	const data = await response.json();
	let infoText = [];
	for (let i = 0; i < data[0].targets.length; i++) {
		infoText.push(data[0].targets[i].description);
	}
	const goalTitle = data[0].title;
	const goalDescription = data[0].description;
	displayGoal(infoText, goalNumber, goalTitle, goalDescription);
}

/*
Vid visning av ett specifikt mål skapas separata p-element för all brödtext samt den korta beskrivningen
Numret på målet och titeln visas
*/
function displayGoal(text, goalNumber, goalTitle, goalDescription) {
	overlay.classList.add('show');
	overlayHeader.innerHTML = `Goal ${goalNumber}`;
	overlayTitle.innerHTML = goalTitle;
	overlayText.innerHTML = '';
	let descriptionNode = document.createElement('p');
	descriptionNode.setAttribute('class', 'summary')
	descriptionNode.innerHTML = goalDescription;
	overlayText.append(descriptionNode);
	for (let i = 0; i < text.length; i++) {
		let node = document.createElement('p');
		node.innerHTML = text[i];
		overlayText.append(node);
	}
}

//Tar bort overlay för specifikt mål
closeButton.addEventListener('click', () => overlay.classList.remove('show'));