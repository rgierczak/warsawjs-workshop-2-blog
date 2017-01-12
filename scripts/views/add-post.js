(function (root) {
    'use strict';
    
    class AddPostView {
        constructor() {
            this.templateURL = 'templates/add-post.hbs';
            this.fetchTemplate();
        }
        
        setupListeners() {
            this.$submitButton = $('#addFormSubmit');
            this.$submitButton.click((event) => {
                event.preventDefault();
                let $event = this.buildEventDetails();
                $(document).trigger($event);
            });
        }
    
        buildEventDetails() {
            let $event = $.Event("addPost");
            $event.detail = {
                addPostTitle: $('#addPostTitle').val(),
                addPostBody: $('#addPostBody').val(),
            };
            return $event;
        }

        fetchTemplate() {
            root.Blog.Request.fetchURL(this.templateURL, this.onSuccess.bind(this), this.onError.bind(this));
        }
        
        onSuccess(template) {
            this.render(template);
            this.setupListeners();
        }
        
        onError(message) {
            throw new Error('Unable to render Handlebars template: ', message);
        }
        
        render(template) {
            let $body = $(document.body);
            let $html = $(template).html();
            let templateScript = Handlebars.compile($html);
            let context = null;
            $body.append(templateScript(context));
        }
    }
    
    root.Blog.AddPostView = AddPostView;
}(window));
