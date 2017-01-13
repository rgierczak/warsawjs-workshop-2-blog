(function (root) {
    'use strict';

    let EntryModel = root.Blog.EntryModel;

    class PostModel extends EntryModel {
        constructor(data) {
            super(data);
            this.title = data.title;
            this.author = data.author;
            this.body = data.body;
        }
    }
    
    root.Blog.PostModel = PostModel;
}(window));
