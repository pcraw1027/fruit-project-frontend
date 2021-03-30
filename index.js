const API_URL = "http://localhost:3000/Fruit/"
let fruitMenu = document.querySelector("div#fruit-menu")
let fruitDetailImageDiv = document.querySelector("div#fruit-detail")
let fruitDetailImageImg = fruitDetailImageDiv.querySelector("img")
let fruitDetailImageName = fruitDetailImageDiv.querySelector("h2")
let fruitForm = document.querySelector("form#fruit-rating")
let fruitFormRating = fruitForm.querySelector("input#rating")
let fruitFormComment = fruitForm.querySelector("textarea#comment")

let displayFruit = {}

// fetch API_URL, {
//     method: 'GET'
//     headers: {
//         'Content-Type': 'application/json',
//     },
// })

fetch(API_URL)
.then(res => res.json())
.then(function(fruitArr){
    fruitArr.forEach(function(fruitObj){
        // console.log(fruitObj)
        let fruitImage = document.createElement("img")
            fruitImage.src = fruitObj.image
            fruitImage.alt = fruitObj.name
        fruitMenu.append(fruitImage)

        fruitImage.addEventListener("click", function(evt){
            fruitDetailImageImg.src = fruitObj.image
            fruitDetailImageName.innerText = fruitObj.name

            fruitFormRating.value = fruitObj.ratings
            fruitFormComment.innerText = fruitObj.comments

            displayFruit = fruitObj


        })
    })
})

fruitForm.addEventListener("submit", function(evt){
    evt.preventDefault()


    let fruitId = displayFruit.id

    let fruitRating = fruitFormRating.value


    let fruitComment = fruitFormComment.value

debugger

    fetch (`http://localhost:3000/Fruit/${fruitId}`, { 
    method: 'PATCH',
    headers: {
        "content-type": "application/json"

    },
    
    body: JSON.stringify ({

        ratings: fruitRating,
        comments: fruitComment
    })
})
    .then (res => res.json ())
    .then (updatedfruitObj => {
    displayFruit.rating = updatedfruitObj.ratings
    displayFruit.comment = updatedfruitObj.comments

})
})
