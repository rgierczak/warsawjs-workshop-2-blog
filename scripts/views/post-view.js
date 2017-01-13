(function (root) {
    'use strict';

    let EntryView = root.Blog.EntryView;

    class PostView extends EntryView {
        constructor(post) {
            super(post);
            this.template = $('#template-post').html();
            this.templateContext = post;
            this.render();
        }
    }

    root.Blog.PostView = PostView;
}(window));
