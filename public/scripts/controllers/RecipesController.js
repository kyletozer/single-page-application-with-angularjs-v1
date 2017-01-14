(function() {
	'use strict';

	angular
		.module('app')
		.controller('RecipesController', [
			'$scope',
			'$location',
			'dataService',
			function($scope, $location, dataService) {

				var endpoints = dataService.endpoints;

				$scope.recipes = null;
				$scope.activeCategory = '';
				$scope.categories = null;

        // retrieve recipes
        dataService
					.apiGet(endpoints.recipes)
					.then(function(data) {
						$scope.recipes = data.data;
					});

        // retrieve categories
				dataService
					.apiGet(endpoints.categories)
					.then(function(data) {
						$scope.categories = data.data;
					});

        // direct to add route
				$scope.goToAddRecipePage = function() {
					$location.path('/add');
				};


        // moved to directive

				// $scope.deleteRecipe = function(index) {
				// 	var url = endpoints.recipes + '/' + $scope.recipes[index]._id;
        //
				// 	dataService
				// 		.apiDelete(url)
				// 		.then(function(data) {
				// 			getRecipeList();
        //
				// 		}, function(error) {
				// 			console.log(error);
				// 		});
				// };

        
				$scope.updateRecipeList = function(value) {
					$scope.activeCategory = value;
				};
			}
		]);

})();
