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

            $scope.deleteRecipe = function(index){

              console.log('recipe deleted at index ' + index);

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

                  // before recipes reassignment
                  console.log('before deletion:', $scope.recipes);
                  $scope.recipes = data.data;

                  // updates value but does not reflect in view
                  console.log('after deletion:', $scope.recipes);
                }
              );
            }
          }
        ],

        link: function(scope, element, attrs){
          // console.log(scope, element, attrs);

          var index = Number(attrs.recipeIndex);
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
