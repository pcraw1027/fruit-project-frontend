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
    fillFruitInfo(fruitArr[0])
    fruitArr.forEach(function(fruitObj){
        // console.log(fruitObj)
        let fruitImage = document.createElement("img")
            fruitImage.src = fruitObj.image
            fruitImage.alt = fruitObj.name
        fruitMenu.append(fruitImage)

        fruitImage.addEventListener("click", function(evt){
            fillFruitInfo(fruitObj)
        })
    })
})

function fillFruitInfo(fruitObj1){
    fruitDetailImageImg.src = fruitObj1.image
    fruitDetailImageName.innerText = fruitObj1.name

    fruitFormRating.value = fruitObj1.ratings
    fruitFormComment.innerText = fruitObj1.comments
    fruitFormComment.value = fruitObj1.comments

    displayFruit = fruitObj1
}

fruitForm.addEventListener("submit", function(evt){
    evt.preventDefault()


    let fruitId = displayFruit.id
    let fruitRating = fruitFormRating.value
    let fruitComment = fruitFormComment.value


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
