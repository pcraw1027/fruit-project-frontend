const API_URL = "http://localhost:3000/Fruit"
let fruitMenu = document.querySelector("div#fruit-menu")
let fruitDetailImageDiv = document.querySelector("div#fruit-detail")
let fruitDetailImageImg = fruitDetailImageDiv.querySelector("img")
let fruitDetailImageName = fruitDetailImageDiv.querySelector("h2")


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
        })
    })
})