// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova', 'radio'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('radio', {
          url: '/',
          templateUrl: 'js/radio/radio.html',
          controller: 'radioCtrl as ctrl'
        })
      // Si la URI introducida no coincide, redirige a esta dirección
      $urlRouterProvider.otherwise('/');
    });
