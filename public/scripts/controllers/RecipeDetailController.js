angular.module('app')

.controller('RecipeDetailController', [
  '$scope',
  '$routeParams',
  'dataService',
  function($scope, $routeParams, dataService){

    var recipeId = $routeParams.id || null;


    if(recipeId){

      $scope.recipeId = recipeId;

      dataService.getRecipeById(recipeId)
        .then(function(data){
          console.log(data.data);
          $scope.recipe = data.data;
        });

      dataService.getAllCategories()
        .then(function(data){
          console.log(data.data);
          $scope.categories = data.data;
        });

      dataService.getAllFoodItems()
        .then(function(data){
          console.log(data.data);
          $scope.foodItems = data.data;
        });
    }

    $scope.addIngredient = function(){
      $scope.recipe.ingredients.push({});
    };
  }
]);
