(function() {
    'use strict';

    angular.module('app')
        .factory('bookLoggerInterceptor', bookLoggerInterceptor);

    bookLoggerInterceptor.$inject = ['$q', '$log'];

    function bookLoggerInterceptor() {

        return {
            request: requestInterceptor,
            responseError: responseErrorInterceptor

            // not yet implemented - all interceptors are optional
            // requestError
            // response
        };

        function requestInterceptor(config) {
            $log.debug('HTTP ' + config.method + 'request - ' + config.url);
            return config;
        }

        function responseErrorInterceptor(response) {
            $log.debug('HTTP ' + response.config.method + ' response error - ' + response.config);
            return $q.reject(response);
        }
    }
})();