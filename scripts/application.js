(function (root) {
    'use strict';

    let $ = root.$;

    let PostView = root.Blog.PostView;
    let AddPostView = root.Blog.AddPostView;

    let PostModel = root.Blog.PostModel;
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
            $(document).on('router:home', (event) => this.onRouterHomeHandler());
            $(document).on('router:post', (event) => this.onRouterPostHandler(event));
        }

        onPostSubmittedHandler(postData) {
            this.createPost(postData);
            StorageService.setData(this.postList.getPosts(), (payload) => {
                console.log(payload);
            });
        }

        onRouterHomeHandler() {
            console.log('ROUTER: HOME');
            this.clearDOMContainer();
            new AddPostView();
            StorageService.getData((storedPosts) => {
                storedPosts.forEach((postData) => this.createPost(postData));
            });
        }

        onRouterPostHandler(event) {
            this.clearDOMContainer();
            let postId = parseInt(event.detail.id);
            this.getPostModelById(postId, (postModel) => {
                new AddPostView();
                new PostView(postModel);
                console.log('ROUTER: POST: ', postModel);
            });
        }

        clearDOMContainer() {
            $('#view-container').empty();
        }

        getPostModelById(id, callback) {
            StorageService.getData((storedPosts) => {
                let postModel = storedPosts.find((post) => {
                    return post.id === id;
                });
                if (!postModel)
                    throw new Error('Nie znaleziono posta o ID: ' + id);

                callback(postModel);
            });
        }

        createPost(postData) {
            let postModel = new PostModel(postData);
            this.postList.addPost(postModel);
            new PostView(postModel);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.a = new Application();
    });
}(window));
