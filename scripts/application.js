(function (root) {
    'use strict';

    let $ = root.$;

    let PostView = root.Blog.PostView;
    let AddFormPostView = root.Blog.AddFormPostView;
    let CommentView = root.Blog.CommentView;
    let AddFormCommentView = root.Blog.AddFormCommentView;

    let PostModel = root.Blog.PostModel;
    let CommentModel = root.Blog.CommentModel;
    let PostListModel = root.Blog.PostListModel;

    let StorageService = root.Blog.StorageService;
    let Router = root.Blog.Router;

    class Application {
        constructor() {
            this.postList = new PostListModel();
            this.setupListeners();
            new Router();
        }

        setupListeners() {
            $(document).on('add-post:submitted', (event) => this.onPostSubmittedHandler(event.detail));
            $(document).on('add-comment:submitted', (event) => this.onCommentSubmittedHandler(event.detail));
            $(document).on('router:home', (event) => this.onRouterHomeHandler());
            $(document).on('router:post', (event) => this.onRouterPostHandler(event));
        }

        onPostSubmittedHandler(postData) {
            this.createPost(postData);
            this.saveData();
        }

        saveData() {
            StorageService.setData(this.getPosts(), (payload) => {
                console.log(payload);
            });
        }

        getPosts() {
            let posts = [];

            this.postList.getEntries().forEach((post) => {
                posts.push({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    author: post.author,
                    comments: post.comments.getEntries().map((comment) => {
                        return {
                            id: comment.id,
                            body: comment.body,
                            author: comment.author
                        }
                    })
                });

            });
            return posts;
        }

        onCommentSubmittedHandler(commentData) {
            let postId = parseInt(commentData.postId);
            let postModel = this.postList.getEntryById(postId);
            console.log('Klikniety postmdel : ', postModel);
            this.createComment(commentData, postModel);
            this.saveData();
        }

        onRouterHomeHandler() {
            this.clearDOMContainer();
            new AddFormPostView();
            this.restorePostList();
        }

        restorePostList(callback = Function) {
            this.postList.clear();
            StorageService.getData((storedPosts) => {
                storedPosts.forEach((postData) => this.createPost(postData));
                callback();
            });
        }

        onRouterPostHandler(event) {
            this.clearDOMContainer();
            let postId = parseInt(event.detail.id);
            this.restorePostList(() => {
                new AddFormCommentView(postId);

                let postModel = this.postList.getEntryById(postId);
                postModel.comments.each((comment) => {
                    new CommentView(comment);
                });
            });
        }

        clearDOMContainer() {
            $('#view-container').empty();
        }

        createPost(postData) {
            let postModel = new PostModel(postData);
            this.postList.addEntry(postModel);
            new PostView(postModel);
        }

        createComment(commentData, postModel) {
            let commentModel = new CommentModel(commentData);
            postModel.comments.addEntry(commentModel);
            new CommentView(commentModel);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.a = new Application();
    });
}(window));
