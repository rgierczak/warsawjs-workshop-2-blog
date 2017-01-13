(function (root) {
    'use strict';
    
    class AddPostView {
        constructor() {
            this.templateURL = 'templates/add-post.hbs';
            this.fetchTemplate();
        }
        
        setupListeners() {
            $('#addFormSubmit').click((event) => {
                this.buttonClickHandler(event);
            });
        }
    
        buttonClickHandler(event) {
            event.preventDefault();
            let $event = this.buildEventDetails();
            $(document).trigger($event);
        }
    
        buildEventDetails() {
            let $event = $.Event("addPost");
            $event.detail = {
                id: parseInt(Math.random() * 1000),
                title: $('#addPostTitle').val(),
                author: $('#addPostAuthor').val(),
                body: $('#addPostBody').val(),
            };
            return $event;
        }

        fetchTemplate() {
            root.Blog.RequestService.fetchURL(this.templateURL, this.onSuccess.bind(this), this.onError.bind(this));
        }
        
        onSuccess(template) {
            let $element = $(document.body);
            root.Blog.DOMHelper.render(template, $element);
            this.setupListeners();
        }
        
        onError(message) {
            throw new Error('Unable to render Handlebars template: ', message);
        }
    }
    
    root.Blog.AddPostView = AddPostView;
}(window));
