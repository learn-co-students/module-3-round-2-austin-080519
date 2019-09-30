const beerURL = 'http://localhost:3000/beers';
const listGroup = document.getElementById('list-group');
const beerDetail = document.getElementById('beer-detail');

document.addEventListener('DOMContentLoaded', (event) => {
    
    fetch(beerURL)
        .then(response => response.json() )
        .then(beerData => {
            console.log('JSON beer data = ', beerData);
            loadBeers(beerData);
        })
});

function loadBeers(beerData) {
    for (const beer of beerData) {
        //console.log(beer) 
        //Example li: <li class="list-group-item">Beer title 1</li>
        createBeer(beer);
    }
};

function createBeer(beer) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.innerText = beer.name;
    li.addEventListener('click', (event) => {
        //remove previous beer details
        while (beerDetail.hasChildNodes() ) {  
            beerDetail.removeChild(beerDetail.firstChild);
        }
        
        //display beer details
        displayBeerDetails(beer);
    })
    listGroup.appendChild(li);
};

function displayBeerDetails(beer) { 
    console.log("a beer has been clicked")
    /*
    <h1>Beer Name</h1>
    <img src="<add beer img url here>">
    <h3>Beer Tagline</h3>
    <textarea>Beer Description</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    */

    //name
    const h1 = document.createElement('h1')
    h1.innerText = beer.name;
    beerDetail.appendChild(h1);
    //image
    const img = document.createElement('img');
    img.setAttribute('src', `${beer.image_url}`);
    beerDetail.appendChild(img);
    //tagline
    const h3 = document.createElement('h3');
    h3.innerText = beer.tagline;
    beerDetail.appendChild(h3);
    //textarea
    const textarea = document.createElement('textarea');
    textarea.innerText = beer.description;
    beerDetail.appendChild(textarea)
    //button
    const bt = document.createElement('button');
    bt.setAttribute('id', 'edit-beer');
    bt.setAttribute('class', 'btn btn-info');
    bt.innerText = 'Save';
    bt.addEventListener('click', (event) => {
        console.log("The save button has been clicked")
        console.log("new description = ", textarea.value)
        let newDescription = textarea.value
        let patchURL = `http://localhost:3000/beers/${beer.id}`

        let newData = {
            description: newDescription
        }
        //console.log("newData = ", newData)

        let newObject = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newData)
        }
        //console.log("newObject = ",newObject)

        fetch(patchURL, newObject)
            .then(response => response.json() )
            .then(newData => console.log("PATCH request response = ", newData) )
    })
    
    beerDetail.appendChild(bt);
}