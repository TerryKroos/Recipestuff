const express = require('express');
const app = express();
const PORT = 3000;
const recipe = require('./recipe');
const recipeweb = require('./recipe-web');

app.use(express.static('./public'));

app.get('/', (req, res) => {

    res.send(recipeweb.recipehtml.homepage(recipe));

});


app.get('/recipepage', (req, res) => {
    const { recipename, isJSenabled } = req.query;
    
    console.log(isJSenabled);
    let JSenabled = isJSenabled;
    const recipes = recipe.recipes;

    let currentrecipe;
    for (let recipe = 0; recipe < recipes.length; recipe++) {
        
        if (recipes[recipe].title === recipename) {
            currentrecipe = recipes[recipe];


            break;
        }
    }
    if (JSenabled==="true") {
        res.json(currentrecipe);
         console.log("herekk");

    }
    else {
        console.log("here");
        res.send(recipeweb.recipedetails.detailspage(currentrecipe));
    }

});
app.get('/recipe', (req, res) => {
    res.send(recipeweb.newrecipe.newrecipepage());
});

app.post('/recipe', express.urlencoded({ extended: false }), (req, res) => {
    const { recipetitle, recipeingredients, recipeinstructions } = req.body;
    
    const recipeingredientsarray = recipeingredients.split(",");
    const recipeinstructionsarray = recipeinstructions.split(",");

    recipe.addRecipe({ title: recipetitle, ingredients: recipeingredientsarray, instructions: recipeinstructionsarray });
    const recipename = recipe.recipes[recipe.recipes.length - 1].title;
    const recipes = recipe.recipes;
    
    res.redirect(`/recipepage?recipename=${recipename}`);


});
app.post('/recipee',express.json(),(req,res)=>{
    const { recipetitle, recipeingredients, recipeinstructions } = req.body;
    
    const recipeingredientsarray = recipeingredients.split(",");
    const recipeinstructionsarray = recipeinstructions.split(",");
    let alreadyinarray = false;
    for(let recipecount=0;recipecount<recipe.recipes.length;recipecount++){

        if(recipe.recipes[recipecount].title.toLowerCase()===recipetitle.toLowerCase()){
    
            alreadyinarray = true;
            break;
        }
    }
   
    if(alreadyinarray){
        res.status(409).json({error: 'Recipe already exists'});
    }
    else{
        
        recipe.addRecipe({ title: recipetitle, ingredients: recipeingredientsarray, instructions: recipeinstructionsarray });
        const currentrecipe = recipe.recipes[recipe.recipes.length - 1];
        res.json(currentrecipe);
    }
    


});







app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));