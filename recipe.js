const recipes = [{title:"Bread",ingredients:["bread","egg"], instructions:["Put bread in egg"]}];


function addRecipe({title,ingredients,instructions}){


   recipes.push({title,ingredients,instructions});
}
const recipe = {recipes,addRecipe};
module.exports = recipe;