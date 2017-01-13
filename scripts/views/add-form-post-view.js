(function (root) {
    'use strict';

    let $ = root.$;
    let AddFormEntryView = root.Blog.AddFormEntryView;

    class AddFormPostView extends AddFormEntryView {
        constructor() {
            super();
            this.$form = $('#add-post-form');
            this.template = $('#template-add-post').html();
            this.render();
        }

        buildEventDetails() {
            let $event = $.Event("add-post:submitted");
            $event.detail = {
                title: $('#add-post-title').val(),
                author: $('#add-post-author').val(),
                body: $('#add-post-body').val(),
            };
            return $event;
        }
    }
    
    root.Blog.AddFormPostView = AddFormPostView;
}(window));
