(function (root) {
    'use strict';

    class EntryListModel {
        constructor() {
            this.entryList = [];
        }

        addEntry(entry) {
            this.entryList.push(entry);
            return entry;
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
