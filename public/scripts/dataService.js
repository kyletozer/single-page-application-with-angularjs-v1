(function(){
  'use strict';

  angular.module('app')


  .service('dataService', [
    '$http',
    '$q',
    function($http, $q){

      this.endpoints = {
        recipes: 'http://localhost:5000/api/recipes',
        categories: 'http://localhost:5000/api/categories',
        foodItems: 'http://localhost:5000/api/foodItems'
      };


      this.apiGet = function(url, id){

        var deferred = $q.defer();

        if(id){ url = url + '/' + id; }

        $http.get(url)
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


      this.apiPost = function(url, body){

        var deferred = $q.defer();

        $http.post(url, body)
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


      this.apiPut = function(url, body){

        var deferred = $q.defer();

        $http.put(url, body)
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


      this.apiDelete = function(url){

        var deferred = $q.defer();

        $http.delete(url)
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

})();
