angular.module('app')

.controller('RecipesController', [
  '$scope',
  '$location',
  'dataService',
  function($scope, $location, dataService){

    dataService.getAllRecipes()
      .then(function(data){
        console.log(data);
        $scope.recipes = data;
      });

    $scope.goToAddRecipePage = function(){
      $location.path('/add');
    }
  }
]);
