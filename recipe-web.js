const recipehtml = { 
    homepage:function(recipexport){
       return `<!DOCTYPE html>
       <html>
         <head>
         <link rel="stylesheet" href="/recipe.css"/>
           <title>Recipes</title>
         </head>
         <body>
           <div id="recipe-app">
             <div class="recipe-listdiv">
               <ol class = "recipe-list">
               ${recipehtml.getRecipeList(recipexport)}
               </ol>
                
             </div>
             <div class="bottom-panel">
             <form action="/recipe" "GET">
              <button class="addrecipe" type="submit">Enter New Recipe</button>
             </form>
             </div>
           </div>
           <script src="recipefront.js"></script>
         </body>
       
       `;

    },

    getRecipeList: function(recipexport) {
        return recipexport.recipes.map(recipe =>`<li class="recipe-item" id=${recipe.title}> <a href="/recipepage?isJSenabled=false&recipename=${recipe.title}">${recipe.title}</a></li>`).join('');
        
    }
    
    

};

const recipedetails = {
    detailspage:function(recipe){
       return `<!DOCTYPE html>
       <html>
         <head>
           <link rel="stylesheet" href="/recipe.css"/>
           <title>RecipeDetails</title>
         </head>
         <body>
           <div id="detail-page">
           <div class = "recipetitle">
                ${recipedetails.recipetitle(recipe)}
           </div>
             <div class="ingredients-listdiv">
               <ol class = "ingredients-list">
                <h3>INGREDIENTS</h3>
                ${recipedetails.recipeingredients(recipe)}
               </ol>
                
             </div>
             <div class="instructions-listdiv">
             <ol class = "instructions-list">
              <h3>INSTRUCTIONS</h3>
              ${recipedetails.recipeinstructions(recipe)}
             </ol>
              
           </div>
             <div class = "returntohomediv">
              <a href = "/">Return To Home</a>
             </div>
           </div>
         </body>
       
       `;
    },
    recipetitle: function(recipe){
        return `<h2>${recipe.title.toUpperCase()}</h2>`;
    },
    recipeingredients:function(recipe){
        return recipe.ingredients.map(ingredient=>`<li class= "ingredient">${ingredient}</li>`).join('');
    },
    recipeinstructions:function(recipe){
      return recipe.instructions.map(instruction=>`<li class="instruction">${instruction}</li>`).join('');

    }

    

};
const newrecipe = {
    newrecipepage:function(){
      return `<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/recipe.css"/>
          <title>NewRecipe</title>
        </head>
        <body>
          <div id="newrecipe">
          <form action="/recipe" method="POST" id="FormID">
          <div class ="addrecipetitlediv">
          <label class="addrecipetitlelabel">TITLE</label>
          <input  class="addrecipetitle" name="recipetitle" value = "" placeholder = "Enter Title" required/>
          </div>
          <div class ="addrecipeingredientsdiv">
          <label class="addrecipeingredientlabel">INGREDIENTS</label>
          <textarea  minlength="3" maxlength="12" rows="25" cols = "50" class ="addrecipeingredients" name="recipeingredients" placeholder = "Enter Ingredients Here" required></textarea>
          </div>
          <div class="addrecipeinstructionsdiv">
          <label class="addrecipeinstructionlabel">INSTRUCTIONS</label>
          <textarea  minlength="3" maxlength="12" rows="25" cols = "50"class ="addrecipeinstructions" name="recipeinstructions" placeholder = "Enter Instructions Here" required></textarea>
          </div>
   
           
          
           
           <button  minlength="3" maxlength="12" class="submitrecipe" type="submit" >Submit Recipe</button>
        </form>
            <div class="bottom-panel">
        
            </div>
          </div>
        </body>
      
      `;

    }
};
const recipeweb = {recipehtml,recipedetails,newrecipe};

module.exports = recipeweb;