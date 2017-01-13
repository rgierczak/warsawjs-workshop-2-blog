(function (root) {
    'use strict';

    let $ = root.$;

    class AddPostView {
        constructor() {
            this.render();
        }
        
        setupListeners() {
            $('#add-post-form').submit((event) => this.submitFormHandler(event));
        }
    
        submitFormHandler(event) {
            event.preventDefault();
            let $event = this.buildEventDetails();
            $(document).trigger($event);
        }
    
        buildEventDetails() {
            let $event = $.Event("add-post:submitted");
            $event.detail = {
                title: $('#addPostTitle').val(),
                author: $('#addPostAuthor').val(),
                body: $('#addPostBody').val(),
            };
            return $event;
        }

        render() {
            let template = $('#template-add-post').html();
            let $element = $('#view-container');
            root.Blog.DOMHelper.render(template, $element);
            this.setupListeners();
        }
    }
    
    root.Blog.AddPostView = AddPostView;
}(window));
