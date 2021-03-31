const API_URL = "http://localhost:3000/Fruit/"
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
let fruitFat= document.querySelector("td#fat")
let fruitFatValue= fruitFat.querySelector("b")
let fruitCarbs= document.querySelector("td#carbs")
let fruitCarbsValue= fruitCarbs.querySelector("b")
let fruitSugars= document.querySelector("td#sugars")
let fruitSugarsValue= fruitSugars.querySelector("b")
let fruitProtein= document.querySelector("td#protein")
let fruitProteinValue= fruitProtein.querySelector("b")








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
          //  console.log(fruitObj)
        })
    })
})

function fillFruitInfo(fruitObj){
    fruitDetailImageImg.src = fruitObj.image
    fruitDetailImageName.innerText = fruitObj.name

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
    //fruitObj = updatedfruitObj


    fruitFormRating.value = updatedfruitObj.ratings
    fruitFormComment.innerText = updatedfruitObj.comments
    fruitFormComment.value = updatedfruitObj.comments
    //console.log(fruitObj)
})
})
