

const recepiesAPI = "https://dummyjson.com/recipes";
const container = document.getElementById("container")

async function getRecepies() {
    let responseData = await fetch(recepiesAPI);
    let { recipes } = await responseData.json();
    localStorage.setItem("recipes", JSON.stringify(recipes))
    return recipes;
}


const carousale = document.getElementById("myItems");
getRecepies().then(data => {
    for (let x in data) {
        let recipe = data[x];
        carousale.innerHTML += `
                <div class='${x == 0 ? "carousel-item active" : "carousel-item"}'>
                    <img onclick="getRecipeData(${recipe.id})" class="recipePic" src=${recipe.image}>
                </div>
        `
    }
})


function getRecipeData(id) {
    if (localStorage.getItem("recipes")) {
        const allRecipes = JSON.parse(localStorage.getItem("recipes"));
        let myRecipe = undefined;
        for (let x in allRecipes) {
            if (allRecipes[x].id == id) {
                myRecipe = allRecipes[x]
                break;
            }
        }
        if (myRecipe != undefined) {
            container.innerHTML = `
                <h1>Ingredients</h1>
                <ul>
                    ${myRecipe.ingredients.map(x => `<li>${x}</li>`)
                }
                </ul>
                <h1>Instructions</h1>
                 <ul>
                    ${myRecipe.instructions.map(x => `<li>${x}</li>`)
                }
                </ul>
            `

        } else {
            alert("Something went wrong!")
            return;
        }
    } else {
        alert("No Data Provided!")
    }
}