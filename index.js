// IMPORT RECIPE DATA
import { recipesData } from "./recipesData.js";

// TESTING FUNCTION
function hello(){
    console.log('hello')
}

// CONSTANTS
    const renderRecipesBtn = document.getElementById('render-recipe-btn')
    const recipeContainer = document.getElementById('recipe-container')

    const closeBtn = document.getElementById('close-btn')
    const selectAllMealsBtn = document.getElementById('all-meals')
    const selectAllIngredientsBtn = document.getElementById('select-all-ingredients-btn')
    const selectAllCuisinesBtn = document.getElementById('select-all-cuisines-btn')

    const mealsSelectors = document.getElementById('meals-selectors')
    const ingredientsSelectors = document.getElementById('ingredients-selectors')
    const cuisinesSelectors = document.getElementById('cuisines-selectors')

    const mealCheckbox = document.getElementById('meals-selectors')
    const ingredientsCheckbox = document.getElementById('ingredients-selectors')
    const cuisinesCheckbox = document.getElementById('cuisines-selectors')

    const selectAllRecipes = document.getElementById('select-all-recipes')

    const popUp = document.getElementById('pop-up')

// BOOLEANS
    let isMealsSelectAll = false;
    let isIngredientsSelectAll = false;
    let isCuisinesSelectAll = false;
    let isAllRecipesSelected = false;


// CHECKBOX HIGHLIGHT
    mealCheckbox.addEventListener('change', highlightCheckedOption)
    ingredientsCheckbox.addEventListener('change', highlightCheckedOption)
    cuisinesCheckbox.addEventListener('change', highlightCheckedOption)


// "SELECT ALL" BUTTONS
    selectAllMealsBtn.addEventListener('change', highlightAllMealOptions)
    selectAllIngredientsBtn.addEventListener('change', highlightAllIngredientOptions)
    selectAllCuisinesBtn.addEventListener('change', highlightAllCuisinesOptions)
    selectAllRecipes.addEventListener('change', highlightAllRecipes)

// RENDER RECIPE BUTTON
    renderRecipesBtn.addEventListener('click', renderRecipe)

// RENDER SELECTORS FUNCTIONS
    // Meals Render
        renderMealSelectors()

        function renderMealSelectors(){
            let mealItems = ``
            const mealsArr = getmealsArr(recipesData)
            for (let meal of mealsArr){
                mealItems += `
                    <div class="selector-checkbox meals-class" id="meals-class">
                        <label for="${meal}">${meal[0].toUpperCase() + meal.substring(1)}</label>
                        <input 
                            type="checkbox"
                            id="${meal}"
                            value="${meal}"
                            name="meals"
                        >
                    </div>
                `
            }
            mealsSelectors.innerHTML += mealItems
        }

    // Ingredients Render
        renderIngredientSelectors() 

        function renderIngredientSelectors(){
            let ingredientItems = ``
            const ingredientsArr = getIngredientsArr(recipesData)
            for (let ingredient of ingredientsArr){
                ingredientItems += `
                    <div class="selector-checkbox ingredients-class" id="ingredients-class">
                        <label for="${ingredient}">${ingredient[0].toUpperCase() + ingredient.substring(1)}</label>
                        <input 
                            type="checkbox"
                            id="${ingredient}"
                            value="${ingredient}"
                            name="ingredients"
                        >
                    </div>
                `
            }
            ingredientsSelectors.innerHTML += ingredientItems
        }

    // Cuisines Render
        renderCuisineSelectors() 

        function renderCuisineSelectors(){
            let cuisinesItems = ``
            const cuisinesArr = getCuisinesArr(recipesData)
            for (let cuisine of cuisinesArr){
                cuisinesItems += `
                    <div class="selector-checkbox cuisines-class" id="cuisines-class">
                        <label for="${cuisine}">${cuisine[0].toUpperCase() + cuisine.substring(1)}</label>
                        <input 
                            type="checkbox"
                            id="${cuisine}"
                            value="${cuisine}"
                            name="cuisines"
                        >
                    </div>
                `
            }
            cuisinesSelectors.innerHTML += cuisinesItems
        }

// SORTING FUNCTIONS FOR RENDER

    // Sorting through data for Meals
        function getmealsArr(recipes){
            const mealsArr = []
            for (let recipe of recipes){
                for (let meal of recipe.mealType){
                    if (!mealsArr.includes(meal)){
                        mealsArr.push(meal)
                    }
                }
            }
            return mealsArr
    }

    // Sorting through Data for Ingredients
        function getIngredientsArr(recipes){
            const ingredientsArr = []
            for (let recipe of recipes){
                for (let ingredient of recipe.ingredients){
                    if(!ingredientsArr.includes(ingredient)){
                        ingredientsArr.push(ingredient)
                    }
                }
            }
            return(ingredientsArr)
        } 


    // Sorting through Data for Cuisines
        function getCuisinesArr(recipes){
            const cuisineArr = []
            for (let recipe of recipes){
                for (let cuisine of recipe.cuisine){
                    if (!cuisineArr.includes(cuisine)){
                        cuisineArr.push(cuisine)
                    }
                }
            }
            return cuisineArr
        }

function setTimeOut(){
    popUp.classList.remove('fadeIn')
    popUp.classList.add('fadeOut')
}



function animate(){
    popUp.style.display = 'block'
    popUp.classList.add('fadeIn')
    let fadeOut = setTimeout(function(){
        popUp.classList.remove('fadeIn')
        popUp.classList.add('fadeOut')
    }, 4000)
    let displayNone = setTimeout(function(){
        popUp.style.display = 'none'
        popUp.classList.remove('fadeOut')
    }, 5000)
}

// RENDER RECIPE FUNCTIONS
    function renderRecipe(){
        const checkedOptionArr = document.querySelectorAll('input[type="checkbox"]:checked')


        if (checkedOptionArr.length === 0){
            // console.log('select something!')
            animate()

        } else {
            const recipe = getSingleRecipe()
            const ingredientsHtml = renderIngredients(recipe)
            const instructionsHtml = renderInstructions(recipe)
            
            recipeContainer.innerHTML =`
                <div class="recipe-container"> 
                    <header>
                        <h1 class="recipe-title">${recipe.recipeTitle}</h1>
                        <img src="${recipe.recipeImg}" class="recipe-image">
                    </header>
                    
                    <div class="recipe-information-box">
                        <div class="ingredients-box">
                            <h2>Ingredients</h2>
                            <div>
                                <ul>
                                    ${ingredientsHtml}
                                </ul>
                            </div>
                        </div>
                        <div class="directions-box">
                            <h2>Directions</h2>
                            <div class="ordered-list">
                                <ol type="1">
                                ${instructionsHtml}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }

    //Render Ingredients
        function renderIngredients(a){
            let ingredientsHtml = ``

            for (let ingredient of a.ingredientsList){
                ingredientsHtml += `
                    <li>${ingredient}</li>
                `
            }
            return ingredientsHtml
        }

    //Render Directions
        function renderInstructions(a){
            let instructionsHtml = ``

            for (let instruction of a.instructions){
                instructionsHtml += `
                <li>${instruction}</li>
                `
            }
            return instructionsHtml
        }


// RECIPE SORTERS
    //Get single recipe
        function getSingleRecipe(){
            const recipesArr = getMatchingRecipeArr()
            // console.log(recipesArr)
            if (recipesArr.length === 1){
                return recipesArr[0]
            } else {
                let randomNumber = Math.floor(Math.random() * recipesArr.length) 
                return recipesArr[randomNumber]
            }
        }
    //Match recipe to parameters
        function getMatchingRecipeArr(){
            const checkedOptionArr = document.querySelectorAll('input[type="checkbox"]:checked')
            let recipesArr = []

            if (isAllRecipesSelected || (isIngredientsSelectAll && isMealsSelectAll && isCuisinesSelectAll)){
                return recipesArr = recipesData
            } else {
                let array = []

                for (let checkedOption of checkedOptionArr){
                    
                    if(!array.includes(checkedOption.value)){
                        array.push(checkedOption.value)
                    }
                }
                
                for (let tag of array){
                recipesArr = recipesData.filter(function(recipe){
                    return recipe.tags.includes(tag)
                })

                // for (let tag of array){
                //     if(!recipesArr.tags.includes(tag)){
                //         recipesArr.push()
                //     }
                // }

                // for (let recipe of recipesData){
                //     for (let tag of array){
                //         if(!recipe.tags.includes(tag)){
                //             recipesArr.push(recipe)
                //         }
                //     }
                // }

                }
            }
            // console.log(recipesArr)
                return recipesArr
        }
         
    


// HIGHLIGHT FUNCTIONS

    // Highlight One Function
        function highlightCheckedOption(e){
            const selectorClassArr = document.querySelectorAll('.selector-checkbox input')
            for (let selectorClass of selectorClassArr){
                if (!selectorClass.checked){
                    removeCheckedHighlight(selectorClass)
                }
            }

            const clickedCheckbox = document.getElementById(e.target.id)

            if (!clickedCheckbox.checked){
                clickedCheckbox.parentElement.classList.remove('checked-highlight')
            } else{
                clickedCheckbox.parentElement.classList.add('checked-highlight')
            }

            checkForRemoveCheckedMeal()
            checkForRemoveCheckedIngredients()
            checkforRemoveCheckedCuisines()
            checkForRemovedCheckedAll()

            if (isMealsSelectAll && isIngredientsSelectAll && isCuisinesSelectAll){
                isAllRecipesSelected = true
                document.getElementById('select-all-recipes').parentElement.classList.add('all-highlight')
            }
        }

        // Removing highlight all meals if not all checked
            function checkForRemoveCheckedMeal(){
                const isCheckedArr = document.querySelectorAll('#meals-class input')
                const input = document.getElementById('select-all-meals-btn')
                const array = []
                for (let isChecked of isCheckedArr){
                    if (!isChecked.checked){
                        array.push(isChecked)
                    }

                }
                if (array.length === 0){
                    isMealsSelectAll = true
                    addSelectAllHighlight(input)
                    input.clicked = true
                } else{
                    isMealsSelectAll = false
                    removeSelectAllHighlight(input)
                    input.clicked = false
                }
            }

        // Removing highlight all ingredients if not all checked
            function checkForRemoveCheckedIngredients(){
                const isCheckedArr = document.querySelectorAll('#ingredients-class input')
                const input = document.getElementById('select-all-ingredients-btn')
                const array = []
                for (let isChecked of isCheckedArr){
                    if (!isChecked.checked){
                        array.push(isChecked)
                    }

                }
                if (array.length === 0){
                    isIngredientsSelectAll = true
                    addSelectAllHighlight(input)
                    input.clicked = true
                } else{
                    isIngredientsSelectAll = false
                    removeSelectAllHighlight(input)
                    input.clicked = false
                }
            }

        // Removing highlight all cuisines if not all checked
            function checkforRemoveCheckedCuisines(){
                const isCheckedArr = document.querySelectorAll('#cuisines-class input')
                const input = document.getElementById('select-all-cuisines-btn')
                const array = []
                for (let isChecked of isCheckedArr){
                    if (!isChecked.checked){
                        array.push(isChecked)
                    }
                }
                if (array.length === 0){
                    isCuisinesSelectAll = true
                    addSelectAllHighlight(input)
                    input.clicked = true
                } else{
                    isCuisinesSelectAll = false
                    removeSelectAllHighlight(input)
                    input.clicked = false
                }
            }
        
        // Remove highlight all recipes if not all are checked
            function checkForRemovedCheckedAll(){
                const input = document.getElementById('select-all-recipes')
                const allCheckBoxesArr = document.querySelectorAll('input[type=checkbox]')
                const array = []

                for (let allCheckBoxes of allCheckBoxesArr){
                    if (!allCheckBoxes.checked){
                        array.push(allCheckBoxes)
                    }
                }
                if (array === 0){
                    isAllRecipesSelected = true
                    addSelectAllHighlight(input)
                } else{
                    isAllRecipesSelected = false
                    removeSelectAllHighlight(input)
                }
            }

// HIGHLIGHT ALL FUNCTIONS
    //Highlight all Recipes
        function highlightAllRecipes(e){
            const clickedButton = document.getElementById(e.target.id)
            const selectAllBtnArr = document.getElementsByClassName('input-select-all')
            const allCheckboxArr = document.querySelectorAll('input[type="checkbox"]')

            resetToggle(allCheckboxArr)

            if (isAllRecipesSelected === false){
                isAllRecipesSelected = true
                isMealsSelectAll = true
                isIngredientsSelectAll = true
                isCuisinesSelectAll = true
                for (let checkboxInput of allCheckboxArr){
                    addCheckedHighlight(checkboxInput)
                    checkboxInput.checked = true
                }
                for (let selectAllBtn of selectAllBtnArr){
                    addSelectAllHighlight(selectAllBtn)
                    removeCheckedHighlight(selectAllBtn)
                }
                toggleCheckedOn(selectAllBtnArr)

            } else if (isAllRecipesSelected === true){
                isAllRecipesSelected = false
                isMealsSelectAll = false
                isIngredientsSelectAll = false
                isCuisinesSelectAll = false
                for (let checkboxInput of allCheckboxArr){
                    removeCheckedHighlight(checkboxInput)
                    checkboxInput.checked = false
                }
                for (let selectAllBtn of selectAllBtnArr){
                    removeSelectAllHighlight(selectAllBtn)
                }
                toggleCheckedOff(selectAllBtnArr)
            }
        }

    // Highlight all Meals
        function highlightAllMealOptions(e){
            const classArr = document.querySelectorAll('#meals-class input')
            const clickedButton = document.getElementById(e.target.id)

            resetToggle(classArr)

            if (isMealsSelectAll === false){
                isMealsSelectAll = true
                toggleAllHighlight(isMealsSelectAll, clickedButton)
                for (let classInput of classArr){
                    addCheckedHighlight(classInput)
                }
                toggleCheckedOn(classArr)
                clickedButton.clicked = true

            } else{
                isMealsSelectAll = false
                toggleAllHighlight(isMealsSelectAll, clickedButton)
                for (let classInput of classArr){
                    removeCheckedHighlight(classInput)
                }
                toggleCheckedOff(classArr)
                clickedButton.clicked = false
            }
        }

    // Highlight all Ingredients
        function highlightAllIngredientOptions(e){
            const classArr = document.querySelectorAll('#ingredients-class input')
            const clickedButton = document.getElementById(e.target.id)

            resetToggle(classArr)

            if (isIngredientsSelectAll === false){
                isIngredientsSelectAll = true
                toggleAllHighlight(isIngredientsSelectAll, clickedButton)
                for (let classInput of classArr){
                    addCheckedHighlight(classInput)
                }
                toggleCheckedOn(classArr)
                clickedButton.clicked = true

            } else{
                isIngredientsSelectAll = false
                toggleAllHighlight(isIngredientsSelectAll, clickedButton)
                for (let classInput of classArr){
                    removeCheckedHighlight(classInput)
                }
                toggleCheckedOff(classArr)
                clickedButton.clicked = false
            }
        }


    // Highlight all Cuisines
        function highlightAllCuisinesOptions(e){
            const classArr = document.querySelectorAll('#cuisines-class input')
            const clickedButton = document.getElementById(e.target.id)

            resetToggle(classArr)

            if (isCuisinesSelectAll === false){
                isCuisinesSelectAll = true
                toggleAllHighlight(isCuisinesSelectAll, clickedButton)
                for (let classInput of classArr){
                    addCheckedHighlight(classInput)
                }
                toggleCheckedOn(classArr)
                clickedButton.clicked = true

            } else{
                isCuisinesSelectAll = false
                toggleAllHighlight(isCuisinesSelectAll, clickedButton)
                for (let classInput of classArr){
                    removeCheckedHighlight(classInput)
                }
                toggleCheckedOff(classArr)
                clickedButton.clicked = false
            }
        }

//TOGGLE CHECKED FUNCTION
    function toggleCheckedOn(tag){
        const inputArr = tag
        for (let input of inputArr){
            input.checked = true
        }
    }

    function toggleCheckedOff(tag){
        const inputArr = tag
        for (let input of inputArr){
            input.checked = false
        }
    }

    function toggleAllHighlight(bool, input){
        if (bool === false){
            removeSelectAllHighlight(input)
        } else if (bool === true){
            addSelectAllHighlight(input)
        }
    }

// RESET ALL TOGGLES FOR SELECT ALL
function resetToggle(tag){
    const inputArr = tag
    for (let input of inputArr){
        input.checked = false
        input.parentElement.classList.remove('checked-highlight')
    }
}

// CLASSLIST MODIFIER FUNCTIONS
function addSelectAllHighlight(a){
    a.parentElement.classList.add('all-highlight')
    a.parentElement.classList.remove('hover-effect')
}

function removeSelectAllHighlight(a){
    a.parentElement.classList.remove('all-highlight')
    a.parentElement.classList.add('hover-effect')
}

function addCheckedHighlight (a){
    a.parentElement.classList.add('checked-highlight')
}

function removeCheckedHighlight (a){
    a.parentElement.classList.remove('checked-highlight')
}


// CLOSE MODAL BUTTON

// closeBtn.addEventListener('click', closeModal)

// function closeModal(){
//     recipeModal.style.display = "none"
//     closeBtn.style.display = "none"
// }

