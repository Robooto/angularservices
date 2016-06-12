(function() {
    'use strict';

    angular.module('app')
        .factory('BooksResource', BooksResource);

    BooksResource.$inject = ['$resource'];

    function BooksResource($resource) {

        return $resource('/api/books/:book_id', {book_id: '@book_id'},
            {
                'update': {method: 'PUT'}
            }
        );
    }
    
})();