(function (root) {
    'use strict';

    class EntryModel {
        constructor(data) {
            this.id = data.id || parseInt(Math.random() * 1000);
        }
    }

    root.Blog.EntryModel = EntryModel;
}(window));
