/*
 * If user has reached end of window, new object to load 
 */
 let data = null; 
 let blabla = document.getElementById("blabla"); 
 let current = 0; 
 

function loadData() {
	return new Promise((resolve, reject) => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => {
				if (!response.ok) reject(new Error(`Response status: ${response.status}`)); 
				else { return response.json(); }
			}).then(json => {
				data = json;
				resolve(); 
			}).catch(error => {
				reject(error); 
			});
		});
}


async function main() {
	await loadData();
	
	for (let i=0; i<9; i++) {
		addNewContent(data[current].title, data[current].body); 
	}
	
	window.addEventListener('scroll', () =>  {
		if (reachedEnd()) {
			console.log(blabla.children.length);
			for (let i=0; i<3; i++) {
				if (blabla.children.length < data.length) {
					addNewContent(data[current].title, data[current].body); 
				}
			}
		}
	});
}

function addNewContent(heading, text) {
	const newElement = document.createElement('div');
	newElement.classList.add('posts');
	
	const header = document.createElement('h4'); 
	header.textContent = heading; 
	newElement.appendChild(header);
	
	const pg = document.createElement('p'); 
	pg.textContent = text; 
	newElement.appendChild(pg);
	
	blabla.appendChild(newElement); 
	current++;
}


const reachedEnd = () => {
	return document.documentElement.clientHeight + window.scrollY >= 
	document.documentElement.scrollHeight - 55; 
}

main();
