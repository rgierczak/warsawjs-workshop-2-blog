(function (root) {
    'use strict';

    let $ = root.$;
    let AddFormEntryView = root.Blog.AddFormEntryView;

    class AddFormPostView extends AddFormEntryView {
        constructor() {
            console.log('AddFormPostView');
            super();
            this.template = $('#template-add-post').html();
            this.render();
            this.$form = $('#add-post-form');
            this.setupListeners();
        }

        buildEventDetails() {
            let $event = $.Event('add-post:submitted');
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
