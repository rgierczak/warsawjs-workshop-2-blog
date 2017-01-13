(function (root) {
    'use strict';
    
    class PostListModel {
        constructor() {
            this.postList = [];
        }
        
        addPost(post) {
            this.postList.push(post);
        }
    }
    
    root.Blog.PostListModel = PostListModel;
}(window));
