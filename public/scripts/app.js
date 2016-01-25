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
    if ($scope.currentUser) {
      $location.path('/');
    }
    // clear sign up / login forms
    $scope.user = {};

    $scope.signup = function() {
      // signup (https://github.com/sahat/satellizer#authsignupuser-options)
      $auth.signup($scope.user)
        .then(function (response) {
          // set token (https://github.com/sahat/satellizer#authsettokentoken)
          $auth.setToken(response.data.token);
          // call $scope.isAuthenticated to set $scope.currentUser
          $scope.isAuthenticated();
          // clear sign up form
          $scope.user = {};
          // redirect to '/profile'
          $location.path('/profile');
        }, function (error) {
          console.log(error.message);
        });
    };


    $scope.login = function() {
      // login (https://github.com/sahat/satellizer#authloginuser-options)
      $auth.login($scope.user)
        // set token (https://github.com/sahat/satellizer#authsettokentoken)
        .then(function (response) {
        // call $scope.isAuthenticated to set $scope.currentUser
        $scope.isAuthenticated();
          // clear sign up form
          $scope.user = {};
          // redirect to '/profile'
          $location.path('/profile');
        }, function (error) {
          console.error(error);
        });
    };
  }]
);

app.controller('ProfileCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
    if(!$scope.currentUser) {
      $location.path('/login');
    }
}]);