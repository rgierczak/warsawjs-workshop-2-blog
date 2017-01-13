(function (root) {
    'use strict';

    let $ = root.$;
    let AddFormEntryView = root.Blog.AddFormEntryView;

    class AddFormCommentView extends AddFormEntryView {
        constructor(postId) {
            console.log('AddFormCommentView', postId);
            super();
            this.postId = postId;
            this.template = $('#template-add-comment').html();
            this.render();
            this.$form = $('#add-comment-form');
            this.setupListeners();
        }
    
        buildEventDetails() {
            let $event = $.Event("add-comment:submitted");
            $event.detail = {
                postId: this.postId,
                author: $('#add-comment-author').val(),
                body: $('#add-comment-body').val(),
            };
            return $event;
        }
    }
    
    root.Blog.AddFormCommentView = AddFormCommentView;
}(window));
