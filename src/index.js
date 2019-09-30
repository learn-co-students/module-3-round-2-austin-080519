document.addEventListener("DOMContentLoaded", (event) => {
    const beerURL = `http://localhost:3000/beers`
    // const singleBeerURL = `http://localhost:3000/beers/${beer.id}`
    const ul = document.getElementById('list-group')
    const beerDetail = document.getElementById('beer-detail')

    fetch(beerURL)
    .then (response => response.json())
    .then (data => {
        console.log(data)
        showBeer(data)
    });

    function showBeer(data) {
        data.forEach(function(beer) {
            const li = document.createElement('li')
            li.setAttribute('class', 'list-group-item')
            const beerName = document.createTextNode(`${beer.name}`)
            li.appendChild(beerName)
            ul.appendChild(li)
        

            li.addEventListener("click", event => {
                beerDetail.innerHTML = ""
                // console.log(`clicking works!`)
                fetch(`http://localhost:3000/beers/${beer.id}`)
                .then (response => response.json())
                .then (data => {
                    // console.log(data.name)
                const h1 = document.createElement('h1')
                const image = document.createElement('img')
                image.src = (`${data.image_url}`)
                const h3 = document.createElement('h3')
                const textArea = document.createElement('textarea')
                const button = document.createElement('button')
                button.setAttribute('class', 'btn btn-info')
                button.setAttribute('id', 'edit-beer')
                button.innerHTML = 'Save'
                const description = document.createTextNode(`${data.description}`)
                const tagline = document.createTextNode(`${data.tagline}`)
                const beerz = document.createTextNode(`${data.name}`)
                
                h1.appendChild(beerz)
                h3.appendChild(tagline)
                textArea.appendChild(description)
                beerDetail.appendChild(h1)
                beerDetail.appendChild(h3)
                beerDetail.appendChild(image)
                beerDetail.appendChild(textArea)
                beerDetail.appendChild(button)
                
                    button.addEventListener("click", event => {
                        
                        const newDesc = textArea.value
                        // console.log(newDesc)
                        fetch(`http://localhost:3000/beers/${beer.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              },
                            body: JSON.stringify({
                                description: newDesc
                            })
                        })
                        .then (response => {
                            console.log(response)
                        })

                    })

                });

            })
        
        })
    };
});