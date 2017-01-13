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

        getEntryById(id) {
            return this.getEntries().find((entry) => entry.id === id);
        }

        clear() {
            this.entryList = [];
        }

        each(callback, context) {
            this.entryList.forEach(callback, context);
        }
    }

    root.Blog.EntryListModel = EntryListModel;
}(window));
