const myUrl = `http://localhost:3000/beers`
const listGroup = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')
const beerName = document.createElement('h1')
const beerImage = document.createElement('img')
const beerTagline = document.createElement('h3')
const beerTextArea = document.createElement('textarea')
const beerButton = document.createElement('button')


document.addEventListener('DOMContentLoaded', event => {

    fetch(myUrl)
    .then(response => response.json())
    .then(data => {
        // console.log('data', data)
        
        diplayName(data)

    })

})

function diplayName(data){

    for(let oneBeer of data){
    // console.log('one beer ', oneBeer)   

    const li = document.createElement('li')
    li.innerText = oneBeer.name
    li.setAttribute('class', 'list-group-item')
    listGroup.appendChild(li)

        li.addEventListener('click', event => {
        
            beerName.innerText = oneBeer.name
            beerImage.src = oneBeer.image_url
            beerTagline.innerText = oneBeer.tagline
            beerTextArea.innerText = oneBeer.description
            beerButton.innerText = 'Edit Beer'
            beerButton.setAttribute('id', 'edit-beer')
            beerButton.setAttribute('class', 'btn btn-info')

            beerDetail.appendChild(beerName)
            beerDetail.appendChild(beerImage)
            beerDetail.appendChild(beerTagline)
            beerDetail.appendChild(beerTextArea)
            beerDetail.appendChild(beerButton)

            beerButton.addEventListener ('click', event => {
                event.preventDefault()
                console.log(event);
                beerTextArea.innerText = beerTextArea.value

                // console.log('this is my beer', beerTextArea.value)

                let data = {
                    description: beerTextArea.value
                  }
            
                  let object = {
                    method: 'PATCH',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
            
                  fetch(`http://localhost:3000/beers/${oneBeer.id}`, object)
                  .then(resp => console.log('resp >>>>>     ', resp))
            
            
            })

            
        })
    }
}




