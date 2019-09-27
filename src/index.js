

const beersURL = `http://localhost:3000/beers`
const beerList = document.getElementById('list-group');
const beerClass = document.getElementsByClassName('list-group-item');
  


document.addEventListener('DOMContentLoaded', event => {
    
    
    fetch(beersURL)
    .then(resp => resp.json())
    .then(beerData => {
        console.log(beerData)

        displayBeers(beerData);
        
        

    })
    
    function displayBeers(beerData) {

        for(let oneBeer of beerData) {

        console.log(oneBeer)
        
            let li = document.createElement('li')
            li.setAttribute('class', 'list-group-item')
            console.log(li)
            li.innerText = oneBeer.name;
            beerList.appendChild(li)

            li.addEventListener('click', event => {

                
                console.log('event.target >>', event.target)
                
                fetch(`http://localhost:3000/beers/${oneBeer.id}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)

                    let beerDetail = document.getElementById('beer-detail');
                    let beerH2 = document.createElement('h2');
                    let beerTagline = document.createElement('h3');
                    let beerImg = document.createElement('img');
                    let beerDesc = document.createElement('textarea')
                    let saveBtn = document.createElement('button');

                    beerImg.src = oneBeer.image_url;
                    beerH2.innerText = oneBeer.name;
                    beerTagline.innerText = oneBeer.tagline;
                    beerDesc.innerText = oneBeer.description;

                    saveBtn.innerText = 'SAVE'
                    saveBtn.setAttribute('id', 'edit-beer');
                    saveBtn.setAttribute('class', 'btn btn-info')

                    beerDetail.appendChild(beerH2)
                    beerDetail.appendChild(beerImg);
                    beerDetail.appendChild(beerTagline);
                    beerDetail.appendChild(beerDesc);
                    beerDetail.appendChild(saveBtn);


                    console.log(beerDetail);
                    console.log(saveBtn);

                    saveBtn.addEventListener('click', event => {
                        console.log(event.target)
                        let textArea = document.querySelector('textarea');
                        let newText = textArea.value;
                        editBeer(oneBeer, newText);
                    })

                })
            })

            function editBeer(oneBeer, newText) {

                fetch(`http://localhost:3000/beers/${oneBeer.id}`, {
                    method: `PATCH`,
                    body: JSON.stringify({
                        description: newText
                        
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                 })

            }
        }
    }

    

})