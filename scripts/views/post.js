(function (root) {
    'use strict';
    
    class PostView {
        constructor(post) {
            this.templateContext = null;
            this.templateURL = 'templates/post.hbs';
            this.setTemplateContext(post);
            this.fetchTemplate();
        }
        
        setTemplateContext(post) {
            this.templateContext = {
                "id": post.id,
                "title": post.title,
                "author": post.author,
                "body": post.body
            }
        }
        
        fetchTemplate() {
            root.Blog.RequestService.fetchURL(this.templateURL, this.onSuccess.bind(this), this.onError.bind(this));
        }
        
        onSuccess(template) {
            let $element = $(document.body);
            let context = this.templateContext;
            root.Blog.DOMHelper.render(template, $element, context);
        }
        
        onError(message) {
            throw new Error('Unable to render Handlebars template: ', message);
        }
    }
    
    root.Blog.PostView = PostView;
}(window));
