import { menuArray } from './data.js'


function getFeedHtml() {
    let feedHTML = ''


    menuArray.forEach(function(dish) {
        let dishIngredients = ''
        let i = 1

        dish.ingredients.forEach(function(ingredient) {
            if (i < dish.ingredients.length) {
                dishIngredients += ingredient + ", "
                i++
                }
            else {dishIngredients += ingredient}
        })
        console.log(dishIngredients)
        
        feedHTML += `
        <div class="dish">
            <div class="dish-description">
                <div class="dish-emoji">
                    ${dish.emoji}
                </div>
                <div class="dish-info">
                    <div class="dish-name">${dish.name}</div>
                    <div class="dish-ingredients">${dishIngredients}</div>
                    <div class="dish-price">$${dish.price}</div>
                </div>
            </div>
            <div class="add">
                +
            </div>
        </div>
        `
    })

    return feedHTML
}

function render() {
    document.getElementById('dishes').innerHTML = getFeedHtml()
}

render()