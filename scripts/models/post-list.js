(function (root) {
    'use strict';
    
    class PostList {
        constructor() {
            this.postList = [];
        }
        
        addPost(post) {
            this.postList.push(post);
        }
    }
    
    root.Blog.PostList = PostList;
}(window));
