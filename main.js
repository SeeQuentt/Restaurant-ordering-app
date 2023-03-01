import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let dishesArray = []
let totalPrice = 0

document.getElementById('dishes').innerHTML = getFeedHtml()

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
            <div class="add" data-add="${dish.id}">
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

    targetDishObj.uuid = uuidv4()

    dishesArray.push(targetDishObj)

    totalPrice += targetDishObj.price

    document.getElementById('order').classList.remove("display-none")

    render()
}

function removeDish(dishId) {
    let index = dishesArray.findIndex(function(dish){
        return dishId == dish.uuid})
    
    totalPrice -= dishesArray[index].price
    if (totalPrice === 0){
        document.getElementById('order').classList.add("display-none")
    }

    dishesArray.splice(index, 1)

    render()
}

function render() {
    
    let orderedDishes = ''

    dishesArray.forEach(function(dish){
    orderedDishes += `
        <div class="ordered-dishes-info">
            <div class="ordered-dishes-details">
                <div>${dish.name}</div>
                <div class="remove-btn" data-remove="${dish.uuid}">remove</div>
            </div>
                <div>$${dish.price}</div>
        </div>
    `
    })
    document.getElementById('ordered-dishes').innerHTML = orderedDishes
    document.getElementById('total-price').innerHTML = "$" + totalPrice
}

