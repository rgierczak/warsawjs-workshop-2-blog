(function (root) {
    'use strict';
    
    class PostListModel {
        constructor() {
            this.postList = [];
        }
        
        addPost(post) {
            this.postList.push(post);
        }
        
        getPost(id) {
            return this.postList.find((post) => post.id === id);
        }
    }
    
    root.Blog.PostListModel = PostListModel;
}(window));
