(function() {
    'use strict';

    angular.module('app')
        .factory('currentUser', currentUser)

    function currentUser() {
        var lastBookEdited = {};

        return {
            lastBookEdited: lastBookEdited
        };
        
    }
})();