let beerURL = "http://localhost:3000/beers"
let ul = document.getElementById("list-group")
document.addEventListener("DOMContentLoaded", (event) => {
    beerlist();
})

function beerlist(){
    fetch(beerURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        beerplug(data)
    })

   
}

function beerplug(data) {
    data.forEach(function(beer){
                    let li = document.createElement("li")
                    li.setAttribute("class", "list-group-item")
                    ul.appendChild(li)
        let beername = beer.name
        li.innerText = beername
        // console.log(beername)
        // console.log(beer)
        li.onclick = function(event){
                let clearing = document.getElementById("beer-detail")
                clearing.innerText = ""
                fetch(`http://localhost:3000/beers/${beer.id}`)
                .then (function(response) {
                    return response.json();
                })
                .then(function(specifics){
                    let detslist = document.createElement("p")
                    let dets = document.getElementById("beer-detail")
                    dets.appendChild(detslist)
                    let head = document.createElement("h1")
                    let image = document.createElement("img")
                    let subhead = document.createElement("h3")
                    let tips = document.createElement("h4")
                    let area = document.createElement("textarea")
                    let editbtn = document.createElement("button")
                    editbtn.setAttribute("id", "edit-beer")
                    editbtn.setAttribute("class", "btn-info")
                    editbtn.innerText = "edit"
                            head.innerText = specifics.name
                            image.src = specifics.image_url
                            area.innerText = specifics.description
                            subhead.innerText = specifics.food_pairing
                            tips.innerText = specifics.brewers_tips
                    detslist.appendChild(head)
                    detslist.appendChild(image)
                    detslist.appendChild(subhead)
                    detslist.appendChild(tips)
                    detslist.appendChild(area)
                    detslist.appendChild(editbtn)
                    editbtn.onclick = function(event) {
                        
                            fetch(`http://localhost:3000/beers/${beer.id}`,{
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                 'Accept': 'application/json'                      
                            },
                            body: JSON.stringify({
                                description: area.value
                            })
                            })
                            .then (function(response){
                                return response.json()
                            })
                            .then (function(info){
                                area.append(info)
                            })
                        }
                    
                        //                 let form = document.createElement("form")
                        //                 let heading = document.createElement("h2")
                        //                 heading.innerText = "edit form"
                        //             let editname = document.createElement("label")
                        //             editname.innerText = specifics.name
                        //             let nameinput = document.createElement('input')
                        //             nameinput.setAttribute("type", "text")
                        //             let savebtn = document.createElement("button")
                        // form.appendChild(heading)
                        // form.appendChild(editname)
                        // form.appendChild(nameinput)
                        // detslist.appendChild(form)
                       
                    }
                    
                )       
                }
                })

                
                    

        }
        // function fix(){
        //     let editbtn = document.getElementById("edit-beer")
        //   editbtn.onclick = function(event) {
        //     console.log("hey")
        //     let dets = document.getElementById("beer-detail")
        //     let form = document.createElement("form")
            
        // }  
        // }
        
    

    


