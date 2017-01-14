(function (root) {
    'use strict';

    function emptyFunction() {
        // Happy coding!
    }

    let StorageService = {
        setData(storedData, callback = emptyFunction) {
            console.warn('StorageService#setData', storedData);
            localStorage.setItem('posts', JSON.stringify(storedData));
            callback({ status: 'OK' });
        },

        getData(callback) {
            let storedItem = JSON.parse(localStorage.getItem('posts')) || [];
            callback(storedItem);
        }
    };

    root.Blog.StorageService = StorageService;
}(window));
