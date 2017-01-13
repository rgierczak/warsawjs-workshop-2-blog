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
                "title": post.title,
                "author": post.author,
                "body": post.body
            }
        }
        
        fetchTemplate() {
            root.Blog.RequestService.fetchURL(this.templateURL, this.onSuccess.bind(this), this.onError.bind(this));
        }
    
        render(template) {
            let $body = $(document.body);
            let $html = $(template).html();
            let templateScript = Handlebars.compile($html);
            $body.append(templateScript(this.templateContext));
        }
        
        onSuccess(template) {
            this.render(template);
        }
        
        onError(message) {
            throw new Error('Unable to render Handlebars template: ', message);
        }
    }
    
    root.Blog.PostView = PostView;
}(window));
