(function (root) {
    'use strict';

    let EntryModel = root.Blog.EntryModel;

    class CommentModel extends EntryModel {
        constructor(data) {
            super(data);
            this.author = data.author;
            this.body = data.body;
        }
    }
    
    root.Blog.CommentModel = CommentModel;
}(window));
