(function (root) {
    'use strict';
    
    class CommentListModel {
        constructor() {
            this.commentList = [];
        }
        
        addComment(comment) {
            this.commentList.push(comment);
        }
        
        getComment(id) {
            return this.commentList.find((comment) => comment.id === id);
        }

        getComments() {
            return this.commentList;
        }
    }
    
    root.Blog.CommentListModel = CommentListModel;
}(window));
