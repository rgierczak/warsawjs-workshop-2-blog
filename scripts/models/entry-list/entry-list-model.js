(function (root) {
    'use strict';

    class EntryListModel {
        constructor() {
            this.entryList = [];
        }

        addEntry(comment) {
            this.entryList.push(comment);
        }

        getEntries() {
            return this.entryList;
        }

        clear() {
            this.entryList = [];
        }
    }

    root.Blog.EntryListModel = EntryListModel;
}(window));
