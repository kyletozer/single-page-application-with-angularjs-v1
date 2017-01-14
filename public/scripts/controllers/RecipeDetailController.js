(function(){
  'use strict';

  angular
  	.module('app')
  	.controller('RecipeDetailController', [
  		'$scope',
  		'$location',
  		'$routeParams',
  		'dataService',
  		function($scope, $location, $routeParams, dataService) {

        function getRecipeData(){
          dataService
  					.apiGet(endpoints.recipes, recipeId)
  					.then(function(data) {
  						console.log(data.data);
  						$scope.recipe = data.data;
  						$scope.recipeName = $scope.recipe.name.slice();
  					}
          );
        }

  			// aids in determining whether a recipe is being added or edited
  			var recipeId = $routeParams.id || null;
  			var endpoints = dataService.endpoints;

        $scope.recipe = {};
  			$scope.recipeErrors = [];
        $scope.recipeModel = null;
        $scope.recipeId = recipeId;
        $scope.saveSuccessMessage = '';
        $scope.recipeName = null;


  			dataService
  				.apiGet(endpoints.recipes)
  				.then(function(data) {
  					$scope.recipeModel = data.data[0];
  				})

  			if (recipeId) {

  				getRecipeData();
  			}

  			dataService
  				.apiGet(endpoints.categories)
  				.then(function(data) {
  					console.log(data.data);
  					$scope.categories = data.data;
  				});

  			dataService
  				.apiGet(endpoints.foodItems)
  				.then(function(data) {
  					console.log(data.data);
  					$scope.foodItems = data.data;
  				});

  			$scope.addIngredient = function(collection) {
  				console.log($scope.recipe);
  				collection.push({});
  			};

  			$scope.removeIngredient = function(collection, index) {
  				if (collection.length === 1) {
  					return;
  				}
  				collection.splice(index, 1);
  			};

  			$scope.cancelRecipe = function() {
  				$location.path('/');
  			};

        $scope.validateFields = function(){

          $scope.recipeErrors = [];

          for(var key in $scope.recipe){

            function check(collection, keys){
              if(!Array.isArray(keys)){ keys = [keys] }

              return collection.every(function(obj){
                var currentKeys = Object.keys(obj);

                return keys.every(function(key){
                  return currentKeys.indexOf(key) !== -1 && obj[key]
                });
              });
            }

            var value = $scope.recipe[key];


            if(Array.isArray(value) && value.length > 0){

              if(key === 'ingredients'){
                value = check(value, ['foodItem', 'amount']);
              }

              if(key === 'steps'){
                value = check(value, 'description');
              }

            }else if(Array.isArray(value) && value.length === 0){
              value = false;
            }

            if(!value){
              $scope.recipeErrors.push(key);
            }
          }
        };

        $scope.saveRecipe = function(){

          $scope.addRecipeProps();
          $scope.validateFields();

          if($scope.recipeErrors.length > 0){
            return;
          }

          if($scope.recipeId){

            var url = endpoints.recipes + '/' + $scope.recipeId;

            dataService.apiPut(url, $scope.recipe)
              .then(function(data){

                console.log(data);

                $scope.saveSuccessMessage = 'Your changes were saved!';
                getRecipeData();

              }, function(error){
                console.log(error);
              }
            );

          }else{

            dataService.apiPost(endpoints.recipes, $scope.recipe)
              .then(function(data){
                console.log(data);
                $location.path('/');

              }, function(error){
                console.log(error);
              }
            );
          }
          console.log($scope.recipeErrors);
        };

  			$scope.updateRecipe = function(key, value) {
  				$scope.recipe[key] = value;
  				console.log($scope.recipe);
  			};

        $scope.addRecipeProps = function(){

          for(var key in $scope.recipeModel){
            var value = $scope.recipeModel[key];

            if(!$scope.recipe[key] && key !== '_id'){
              $scope.recipe[key] = Array.isArray($scope.recipeModel[key]) ? [] : null;
            }
          }
          console.log($scope.recipe);
        };

        $scope.addToCollection = function(recipeKey){
          $scope.addRecipeProps();
          $scope.recipe[recipeKey].push({});
          console.log($scope.recipe);
        };
  		}
  	]
  );

})();
