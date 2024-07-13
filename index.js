const src = document.getElementById("searchBox");
const btn  = document.getElementById("searchBtn");
const recContainer = document.querySelector(".recipe-container");
const recDetail = document.getElementById("recipe-details");
const recBtn = document.getElementById("recipe-close-btn");

const fetchRecipes = async (query)=>{
    recContainer.innerHTML = "<h2>Fetching Recipes.....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recContainer.innerHTML = "";

    response.meals.forEach(meal=>{
        const recDiv = document.createElement("div");
        recDiv.classList.add("recipe");

        recDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        
        `;

        const rbutton = document.createElement("button");
        rbutton.textContent = "View Recipe";
        recDiv.appendChild(rbutton);

        //Adding EventListener to recipe button
   
        rbutton.addEventListener("click", ()=>{
            //recDetail.innerHTML="";
            
            openPopup(meal);
        });

        recContainer.appendChild(recDiv);
    });

   
    
}


const openPopup = (meal)=>{
    
    recDetail.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p><span>${meal.strArea}</span> Dish</p>
        <p class="cc">Category  <span> : ${meal.strCategory}</span> </p>
        <p class="dd">Description : ${meal.strInstructions} </p>
        <a href="${meal.strYoutube}">See on Youtube</a>
    `;
    recDetail.appendChild(recBtn);
 
    recDetail.style.display = "block";


    recBtn.addEventListener("click", ()=>{
        recDetail.style.display = "none";
    });


}

btn.addEventListener("click", function(e){
    e.preventDefault();
    const searchInput = src.value.trim();
    fetchRecipes(searchInput);
})