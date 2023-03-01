import { menuArray } from './data.js'

document.addEventListener('click', function(e) {
    if (e.target.dataset.add){
        addDish(e.target.dataset.add)
    }
    if (e.target.dataset.remove) {
        removeDish(e.target.dataset.remove)
    }
})

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
            <div class="add" id="${dish.id}" data-add="${dish.id}">
                +
            </div>
        </div>
        `
    })

    return feedHTML
}

function addDish(dishId) {

    const targetDishObj = menuArray.filter(function(dish){
        return dish.id == dishId
    })[0]

    document.getElementById('ordered-dishes').innerHTML += `
        <div class="ordered-dishes-detail">
            <div>${targetDishObj.name}</div>
            <div>${targetDishObj.price}</div>
        </div>
    `
    render()
}

function removeDish() {

}

function render() {
    document.getElementById('dishes').innerHTML = getFeedHtml()
}

render()

