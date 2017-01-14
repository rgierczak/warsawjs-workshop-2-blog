(function (root) {
    'use strict';

    let $ = root.$;
    let EntryView = root.Blog.EntryView;

    class PostView extends EntryView {
        constructor(post) {
            console.log('PostView', post);
            super();
            this.template = $('#template-post').html();
            this.templateContext = post;
            this.render();
        }
    }

    root.Blog.PostView = PostView;
}(window));
