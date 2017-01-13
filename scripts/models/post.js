(function (root) {
    'use strict';

    class PostModel {
        constructor(data) {
            this.id = data.id || parseInt(Math.random() * 1000);
            this.title = data.title;
            this.author = data.author;
            this.body = data.body;
        }
    }
    
    root.Blog.PostModel = PostModel;
}(window));
