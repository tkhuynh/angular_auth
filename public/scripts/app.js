var app = angular.module('authSampleApp', ['ngRoute', 'satellizer']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'templates/home.html'
    	})
    	.when('/signup', {
    		templateUrl: 'templates/signup.html',
        controller: 'AuthCtrl'
    	})
    	.when('/login', {
    		templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
    	})
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller('MainCtrl', ['$scope', '$auth', '$http', '$location',
	function ($scope, $auth, $http, $location) {
    $scope.isAuthenticated = function() {
      $http.get('api/me')
        .then(function(response) {
          if (response.data) {
            $scope.currentUser = response.data;
          } else {
            $auth.removeToken();
          }
        }, function (error) {
          console.log(error);
          $auth.removeToken();
        });
    };

    $scope.isAuthenticated();

    $scope.logout = function() {
      // logout (https://github.com/sahat/satellizer#authlogout)
      $auth.logout()
        .then(function() {
          // remove token (https://github.com/sahat/satellizer#authremovetoken)
          $auth.removeToken();
          // set $scope.currentUser = null
          $scope.currentUser = null;
          // redirect to '/login'
          $location.path('/');
        });
    };
  }]
);

app.controller('AuthCtrl', ['$scope', '$auth', '$location',
  function ($scope, $auth, $location) {
    // if $scope.currentUser, redirect to '/profile'

    // clear sign up / login forms

    $scope.signup = function() {
      // signup (https://github.com/sahat/satellizer#authsignupuser-options)

        // set token (https://github.com/sahat/satellizer#authsettokentoken)

        // call $scope.isAuthenticated to set $scope.currentUser

        // clear sign up form

        // redirect to '/profile'
    };

    $scope.login = function() {
      // login (https://github.com/sahat/satellizer#authloginuser-options)

        // set token (https://github.com/sahat/satellizer#authsettokentoken)

        // call $scope.isAuthenticated to set $scope.currentUser

        // clear sign up form

        // redirect to '/profile'
    };
  }]
);

app.controller('ProfileCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
    // if user is not logged in, redirect to '/login'
}]);