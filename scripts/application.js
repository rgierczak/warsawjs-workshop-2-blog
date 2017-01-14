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
            let postModel = this._createPostModel(postData);
            this._renderPostComponent(postModel);
            this._saveData();
        }

        _saveData() {
            StorageService.setData(this._serializePostList());
        }

        _restorePostList(callback = Function) {
            this.postList.clear();
            StorageService.getData((storedPosts) => {
                storedPosts.forEach((postData) => this._createPostModel(postData));
                callback();
            });
        }

        onCommentSubmittedHandler(commentData) {
            let postId = parseInt(commentData.postId);
            let postModel = this.postList.getEntryById(postId);
            console.log('Klikniety postmdel : ', postModel);
            let commentModel = this._createCommentModel(commentData, postModel);
            this._renderCommentComponent(commentModel);
            this._saveData();
        }

        onRouterHomeHandler() {
            this.clearDOMContainer();
            new AddFormPostView();
            this._restorePostList(() => {
                this.postList.each((postModel) => {
                    this._renderPostComponent(postModel);
                })
            });
        }

        onRouterPostHandler(event) {
            this.clearDOMContainer();
            let postId = parseInt(event.detail.id);
            this._restorePostList(() => {
                let postModel = this.postList.getEntryById(postId);
                this._renderPostComponent(postModel);

                new AddFormCommentView(postId);

                postModel.comments.each((comment) => {
                    new CommentView(comment);
                });
            });
        }

        clearDOMContainer() {
            $('#view-container').empty();
        }

        _serializePostList() {
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

        _createPostModel(postData) {
            let postModel = new PostModel(postData);
            return this.postList.addEntry(postModel);
        }

        _renderPostComponent(postModel) {
            new PostView(postModel);
        }

        _createCommentModel(commentData, postModel) {
            let commentModel = new CommentModel(commentData);
            return postModel.comments.addEntry(commentModel);
        }

        _renderCommentComponent(commentModel) {
            new CommentView(commentModel);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.a = new Application();
    });
}(window));
