(function (root) {
    'use strict';

    class Post {
        constructor(data) {
            this.id = data.id;
            this.title = data.title;
            this.author = data.author;
            this.body = data.body;
        }
    }
    
    root.Blog.Post = Post;
}(window));
