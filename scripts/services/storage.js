(function (root) {
    "use strict";

    let StorageService = {
        setData(storedData, callback) {
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
