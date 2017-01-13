(function (root) {
    'use strict';

    class CommentModel {
        constructor(data) {
            this.id = data.id || parseInt(Math.random() * 1000);
            this.author = data.author;
            this.body = data.body;
        }
    }
    
    root.Blog.CommentModel = CommentModel;
}(window));
