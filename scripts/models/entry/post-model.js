(function (root) {
    'use strict';

    let EntryModel = root.Blog.EntryModel;
    let CommentListModel = root.Blog.CommentListModel;

    class PostModel extends EntryModel {
        constructor(data) {
            super(data);
            this.title = data.title;
            this.author = data.author;
            this.body = data.body;
            this.comments = new CommentListModel(data.comments);
        }
    }

    root.Blog.PostModel = PostModel;
}(window));
