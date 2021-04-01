const API_URL = "http://localhost:3000/Fruits/"
let fruitMenu = document.querySelector("div#fruit-menu")
let fruitDetailImageDiv = document.querySelector("div#fruit-detail")
let fruitDetailImageImg = fruitDetailImageDiv.querySelector("img")
let fruitDetailImageName = fruitDetailImageDiv.querySelector("h2")
let fruitForm = document.querySelector("form#fruit-rating")
let fruitFormRating = fruitForm.querySelector("input#rating")
let fruitFormComment = fruitForm.querySelector("textarea#comment")

// Nutrition Label 
let fruitCalories = document.querySelector("td#calories")
let fruitCaloriesValue = fruitCalories.querySelector("b")
let fruitFat = document.querySelector("td#fat")
let fruitFatValue = fruitFat.querySelector("b")
let fruitCarbs = document.querySelector("td#carbs")
let fruitCarbsValue = fruitCarbs.querySelector("b")
let fruitSugars = document.querySelector("td#sugars")
let fruitSugarsValue = fruitSugars.querySelector("b")
let fruitProtein = document.querySelector("td#protein")
let fruitProteinValue = fruitProtein.querySelector("b")

// Delete button
let deleteForm = document.querySelector("form#fruit-delete")
let deleteFormDelete = deleteForm.querySelector("#delete")

let displayFruit = {}
let fruitId = 0

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
            fruitImage.id = fruitObj.id

        fruitMenu.append(fruitImage)

        fruitImage.addEventListener("click", function(evt){
            fillFruitInfo(fruitObj)
          //  console.log(fruitObj)
        })
    })
})

function fillFruitInfo(fruitObj){
    // Image & Name
    fruitDetailImageImg.src = fruitObj.image
    fruitDetailImageName.innerText = fruitObj.name
    // Ratings & Comment
    fruitFormRating.value = fruitObj.ratings
    fruitFormComment.innerText = fruitObj.comments
    fruitFormComment.value = fruitObj.comments
    // Nutrition Label
    fruitCaloriesValue.innerText = fruitObj.calories
    fruitFatValue.innerText = fruitObj.fat + "g"
    fruitCarbsValue.innerText = fruitObj.carbohydrates + "g"
    fruitSugarsValue.innerText = fruitObj.sugar + "g"
    fruitProteinValue.innerText = fruitObj.protein + "g"



    displayFruit = fruitObj
   // console.log(fruitObj)
}

fruitForm.addEventListener("submit", function(evt){
    evt.preventDefault()


    fruitId = displayFruit.id
    let fruitRating = fruitFormRating.value
    let fruitComment = fruitFormComment.value


    fetch (`http://localhost:3000/Fruits/${fruitId}`, { 
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
    displayFruit.ratings = updatedfruitObj.ratings
    displayFruit.comments = updatedfruitObj.comments
    //fruitObj = updatedfruitObj


    fruitFormRating.value = updatedfruitObj.ratings
    fruitFormComment.innerText = updatedfruitObj.comments
    fruitFormComment.value = updatedfruitObj.comments
    //console.log(fruitObj)
})
})

deleteForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    // console.log("delete")

    fruitId = displayFruit.id

    // console.log(fruitId, displayFruit.id)

    fetch (`http://localhost:3000/Fruits/${fruitId}`, { 
    method: 'DELETE',
    })
    .then (res => res.json())
    .then (function(deletedFruitObj) {
        console.log(deletedFruitObj)
        fruitObj = deletedFruitObj

        let delFruit = document.getElementById(fruitId)
        delFruit.remove()

        fruitDetailImageImg.src = deletedFruitObj.image
        fruitDetailImageName.innerText = deletedFruitObj.name

        fruitFormRating.value = deletedFruitObj.ratings
        fruitFormComment.innerText = deletedFruitObj.comments
        fruitFormComment.value = deletedFruitObj.comments

        fruitCaloriesValue.innerText = deletedFruitObj.comments
        fruitFatValue.innerText = deletedFruitObj.comments
        fruitCarbsValue.innerText = deletedFruitObj.comments
        fruitSugarsValue.innerText = deletedFruitObj.comments
        fruitProteinValue.innerText = deletedFruitObj.comments
    
    })

    // location.reload()

})
