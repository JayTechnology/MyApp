(function () {

    var app = angular.module('app', []);

    'use strict';
    var controllerId = 'helpCtrl';
    angular.module('app').controller(controllerId, ['$scope', '$http', '$timeout', formFunc]);

    function formFunc($scope, $http, $timeout) {

        $scope.countryListOptions = {};

        $http.get('country.json').success(function (data) {
            $scope.countryListOptions = data;
        });

        $scope.submit = function (form) {

            //$scope.submitted = true;


            if (form.$invalid) {
                return;
            };


            var config = {
                params: {
                    'callback': 'JSON_CALLBACK',
                    'name': $scope.name,
                    'email': $scope.email,
                    'country': $scope.country,
                    'url': $scope.url,
                    'comments': $scope.comments
                }
            };

            debugger

            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

            $http.post('/api/form', config).success(function (response) {
                debugger
            });

            //    //submit
            //    $http.jsonp('/api/form', config).success(function (data, status, headers, config) {
            //        if (data.status == 'OK') {
            //            $scope.name = null;
            //            $scope.email = null;
            //            $scope.country = null;
            //            $scope.url = null;
            //            $scope.comments = null;
            //            $scope.messages = 'Your form has been sent!';
            //            $scope.submitted = false;
            //        } else {
            //            $scope.messages = 'Oops, we received your request, but there was an error processing it.';
            //            //$log.error(data);
            //        }
            //    })
            //.error(function (data, status, headers, config) {
            //    $scope.progress = data;
            //    $scope.messages = 'There was a network error. Try again later.';
            //    //$log.error(data);
            //});


            $timeout(function () {
                $scope.messages = null;
            }, 3000);

        };
    };


    angular.module('app').directive('noDogs', function factory() {
        return {
            require: 'ngModel',
            link: function linking(scope, element, attr, ctrl) {

                
                ctrl.$parsers.unshift(checkForDogs);

                function checkForDogs(viewValue) {
                    if (/dog/.test(viewValue)) {
                        ctrl.$setValidity('noDogs', true);
                    }
                    else {
                        ctrl.$setValidity('noDogs', false);
                    }
                    return viewValue;
                }

            }
        }
    });

})();