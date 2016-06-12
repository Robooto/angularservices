(function () {

    angular.module('app')
        .controller('BooksController', BooksController);

    BooksController.$inject = ["books", "dataService", "logger", "badgeService", "$cookies", "$cookieStore", "$route", "$log", "BooksResource", "currentUser"];

    function BooksController(books, dataService, logger, badgeService, $cookies, $cookieStore, $route, $log, BooksResource, currentUser) {

        var vm = this;

        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        vm.appName = books.appName;

        // replacing data service call with resource call
        // dataService.getAllBooks()
        //     .then(getBooksSuccess, getBooksError, getBooksNotification)
        //     .catch(getBooksError)
        //     .finally(getAllBooksComplete);

        vm.allBooks = BooksResource.query();

        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

        function getBooksError(response) {
            console.log(reason);
        }

        function getBooksNotification(notification) {
            console.log('Promise Notification', notification);
        }

        function getAllBooksComplete() {
            console.log('Get all books has completed');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(getReadersError)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }

        function getReadersError(response) {
            console.log(reason);
        }

        function getAllReadersComplete() {
            console.log('Get all Readers has completed');
        }

        vm.deleteBook = function (bookID) {
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController has been created.');

        vm.favoriteBook = $cookies.favoriteBook;

        vm.currentUser = currentUser;

        vm.lastEdited = $cookieStore.get('lastEdited');

    }


} ());