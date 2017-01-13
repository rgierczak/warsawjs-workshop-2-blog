(function (root) {
    'use strict';

    let EntryView = root.Blog.EntryView;

    class CommentView extends EntryView {
        constructor(comment) {
            console.log('CommentView', comment);
            super(comment);
            this.templateContext = comment;
            this.template = $('#template-comment').html();
            this.render();
        }
    }

    root.Blog.CommentView = CommentView;
}(window));
