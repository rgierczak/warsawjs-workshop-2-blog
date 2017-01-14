(function (root) {
    'use strict';

    let EntryListModel = root.Blog.EntryListModel;

    class CommentListModel extends EntryListModel {
        constructor(comments) {
            super();
            this.entryList = comments || [];
        }
    }

    root.Blog.CommentListModel = CommentListModel;
}(window));
