"use strict";
(function () {
    const recipelistdiv = document.querySelector('.recipe-listdiv');
    const recipelist = document.querySelectorAll('.recipe-list li');
    for (let recipe of recipelist) {
        const recipetitle = recipe.id;
        console.log(recipetitle);
        recipe.addEventListener('click', (event) => {
            event.preventDefault();
            

           
            fetch(`/recipepage?isJSenabled=true&recipename=${recipetitle}`).then(response => {
                if (response.ok) {
                   
                    return response.json();
                }
            }

            ).then(function (recipedata) {
                
                const instructions = recipedata.instructions;
                const ingredients = recipedata.ingredients;
                

                const titlepage = `<h2>${recipedata.title.toUpperCase()}</h2>`
                const instructionsPage = instructions.map(instruction => 
                    `<li class = instruction>${instruction}</li>`
                ).join('');
                const ingredientsPage = ingredients.map(ingredient => 
                    `<li class="ingredient">${ingredient}</li>`
                ).join('');
                const returntohome=`<a href = "/">Return To Home</a>`

               
                document.querySelector('.addrecipe').style.visibility="hidden";


                const page = `<div>${titlepage}</div><div><h2>INSTRUCTIONS</h2>${instructionsPage}</div><div><h2>INGREDIENTS</h2>${ingredientsPage}</div><div class = "returntohomediv">${returntohome}</div>`;
                recipelistdiv.innerHTML = page;
            });




        });
    }
   const addrecipebutton= document.querySelector('.addrecipe');
   addrecipebutton.addEventListener('click',(event)=>{
     event.preventDefault();
     
     document.querySelector('.addrecipe').style.visibility="hidden";
     const newrecipeform =  `<div class="newrecipeform">
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

        <button  minlength="3" maxlength="12" class="submitrecipe" type="submit" disabled>Submit Recipe</button>
     </form>
       <div class="errormessagediv"></div>
    </div>`

    
  
    
    recipelistdiv.innerHTML = newrecipeform;
    const submitrecipebutton = document.querySelector('.submitrecipe');
    submitrecipebutton.disabled = true;
    

    const addrecipetitle = document.querySelector('.addrecipetitle');
    
    addrecipetitle.addEventListener('keyup',(event)=>{
       
        if(addrecipetitle.checkValidity()){
           
            submitrecipebutton.disabled = false;
        }
        else{
            submitrecipebutton.disabled = true;
        }
        
        });
      

    
    
   
    submitrecipebutton.addEventListener('click',(event)=>{
      
        event.preventDefault();
    
     const  addrecipetitlevalue = document.querySelector('.addrecipetitle').value;
     const addrecipeingredientsvalue = document.querySelector('.addrecipeingredients').value;
     const addrecipeinstructionsvalue = document.querySelector('.addrecipeinstructions').value;
     if(addrecipetitlevalue.length===0||addrecipeingredientsvalue.length===0||addrecipeinstructionsvalue.length===0){
         const errormessage = `<p>Enter values in all boxes</p>`
         document.querySelector('.errormessagediv').innerHTML = errormessage;
     }
     else{
     const formvalues = {};
     formvalues.recipetitle = addrecipetitlevalue;
     formvalues.recipeingredients= addrecipeingredientsvalue;
     formvalues.recipeinstructions= addrecipeinstructionsvalue;
     
    
     fetch('/recipee',{method:'POST',headers:new Headers({'content-type':'application/json'}),body:JSON.stringify(formvalues)}).then(response=>{
     if(response.ok){
       
         return response.json();
     }
     throw new error("This did not work");
 }).then(function(currentrecipe){
     
     const instructions = currentrecipe.instructions;
     const ingredients = currentrecipe.ingredients;
    
 
     const titlepage = `<h2>${currentrecipe.title.toUpperCase()}</h2>`
     const instructionsPage = instructions.map(instruction => 
         `<li class="instruction">${instruction}</li>`
     ).join('');
     const ingredientsPage = ingredients.map(ingredient => 
         `<li class = "ingredient">${ingredient}</li>`
     ).join('');
     const returntohome=`<a href = "/">Return To Home</a>`
 
     
     document.querySelector('.addrecipe').style.visibility="hidden";
 
 
     const page = `<div>${titlepage}</div><div><h2>INSTRUCTIONS</h2>${instructionsPage}</div><div><h2>INGREDIENTS</h2>${ingredientsPage}</div><div class = "returntohomediv">${returntohome}</div>`;
     recipelistdiv.innerHTML = page;
 
 }).catch(()=>{
    const errormessage = `<p>Recipe already exists!</p>`;
    document.querySelector('.errormessagediv').innerHTML = errormessage;
 });
     
 
 
    } });
   });
   
   const submitrecipebutton = document.querySelector('.submitrecipe');
  

    

   

})();