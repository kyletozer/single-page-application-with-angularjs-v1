
// I set up this directive to fulfull the exceeds portion of the project.

(function() {
  'use strict';

	angular
		.module('app')
		.directive('confirmDeletion', function() {

      return {

        restrict: 'A',

        scope: {
          recipes: '='
        },

        controller: [
          '$scope',
          'dataService',
          function($scope, dataService){

            var endpoints = dataService.endpoints;

            // make the call to the delete the recipe record from the database
            $scope.deleteRecipe = function(index){
              var url = endpoints.recipes + '/' + $scope.recipes[index]._id;

              dataService.apiDelete(url)
                .then(
                  deleteSuccessCallback,
                  function(error){
                    console.log(error);
                  }
              );
            };


            function deleteSuccessCallback(data){

              dataService.apiGet(endpoints.recipes)
                .then(function(data){
                  // trigger an event so that the parent controller can know when to update the view
                  $scope.$emit('updateRecipes', data.data);
                }
              );
            }
          }
        ],


        link: function(scope, element, attrs){

          var index = Number(attrs.recipeIndex);

          // keeps track of the number of times a user has clicked on the delete option, two clicks in a succession will delete the recipe
          var count = 0;

          element.on('focus', function(){
            element.html('Are you sure?');
          });

          element.on('blur', function(){
            count = 0;
            element.html('<img src="images/delete.svg" height="12px"> Delete');
          });

          element.on('click', function(){
            count += 1;

            if(count === 2){
              count = 0;
              scope.deleteRecipe(index);
            }
          });
        }
      };
    });
})();
