angular.module('app')


.service('dataService', [
  '$http',
  '$q',
  function($http, $q){

    this.getAllRecipes = function(){

      var deferred = $q.defer();

      $http.get('http://localhost:5000/api/recipes')
        .then(
          function(data){
            deferred.resolve(data);
          },
          function(error){
            deferred.reject(error);
          }
        );

      return deferred.promise;
    };


    this.getRecipeById = function(id){

      var deferred = $q.defer();

      $http.get('http://localhost:5000/api/recipes/' + id)
        .then(
          function(data){
            deferred.resolve(data);
          },
          function(error){
            deferred.reject(error);
          }
        );

      return deferred.promise;
    };


    this.getAllCategories = function(){

      var deferred = $q.defer();

      $http.get('http://localhost:5000/api/categories')
        .then(
          function(data){
            deferred.resolve(data);
          },
          function(error){
            deferred.reject(error);
          }
        );

      return deferred.promise;
    };


    this.getAllFoodItems = function(){

      var deferred = $q.defer();

      $http.get('http://localhost:5000/api/fooditems')
        .then(
          function(data){
            deferred.resolve(data);
          },
          function(error){
            deferred.reject(error);
          }
        );

      return deferred.promise;
    };
  }
]);
