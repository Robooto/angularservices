(function () {
    'use strict';

    angular.module('app')
        .controller('EditBookController', EditBookController)

    // books comes from the resolve prop and it is the promise from the resolve function
    EditBookController.$inject = ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'currentUser'];

    function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location, currentUser) {
        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);
        
        function getBookSuccess(book) {
            vm.currentBook = book;
            currentUser.lastBookEdited = vm.currentBook;
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.setAsFavorite = function() {
            $cookies.favoriteBook = vm.currentBook.title;
        }

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSucess)
                .catch(updateBookError);
        };

        function updateBookSucess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }

        
    }
})();