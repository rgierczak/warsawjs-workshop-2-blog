(function (root) {
    'use strict';

    class PostView {
        constructor(post) {
            this.templateContext = null;
            this.setTemplateContext(post);
            this.render();
        }

        setTemplateContext(post) {
            this.templateContext = {
                "id": post.id,
                "title": post.title,
                "author": post.author,
                "body": post.body
            }
        }

        render() {
            let template = $('#template-post').html();
            let $element = $('#view-container');
            let context = this.templateContext;
            root.Blog.DOMHelper.render(template, $element, context);
        }
    }

    root.Blog.PostView = PostView;
}(window));
