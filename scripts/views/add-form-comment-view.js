(function (root) {
    'use strict';

    let $ = root.$;
    let AddFormEntryView = root.Blog.AddFormEntryView;

    class AddFormCommentView extends AddFormEntryView {
        constructor() {
            super();
            this.$form = $('#add-comment-form');
            this.template = $('#template-add-comment').html();
            this.render();
        }
    
        buildEventDetails() {
            let $event = $.Event("add-comment:submitted");
            $event.detail = {
                author: $('#add-comment-author').val(),
                body: $('#add-comment-body').val(),
            };
            return $event;
        }
    }
    
    root.Blog.AddFormCommentView = AddFormCommentView;
}(window));
