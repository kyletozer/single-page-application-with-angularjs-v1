(function(){
  'use strict';

  angular.module('app')

  .controller('RecipesController', [
    '$scope',
    '$location',
    'dataService',
    function($scope, $location, dataService){

      function getRecipeList(){
        dataService.apiGet(endpoints.recipes)
          .then(function(data){
            $scope.recipes = data.data;
          }
        );
      }


      var endpoints = dataService.endpoints;

      $scope.recipes = null;
      $scope.activeCategory = '';
      $scope.categories = null;


      dataService.apiGet(endpoints.categories)
        .then(function(data){
          console.log(data.data);
          $scope.categories = data.data;
        }
      );

      $scope.goToAddRecipePage = function(){
        $location.path('/add');
      };

      $scope.deleteRecipe = function(index){
        

        // var url = endpoints.recipes + '/' + $scope.recipes[index]._id;
        //
        // dataService.apiDelete(url)
        //   .then(function(data){
        //     getRecipeList();
        //
        //   }, function(error){
        //     console.log(error);
        //   }
        // );
      };

      $scope.updateRecipeList = function(value){
        $scope.activeCategory = value;
      };

      getRecipeList();
    }
  ]);

})();
