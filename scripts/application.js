(function (root) {
    'use strict';
    
    let PostView = root.Blog.PostView;
    let AddPostView = root.Blog.AddPostView;
    
    let PostModel = root.Blog.PostModel;
    let PostListModel = root.Blog.PostListModel;
    
    let StorageService = root.Blog.StorageService;
    let Router = root.Blog.Router;
    
    class Application {
        constructor() {
            this.setupListeners();
            new Router();
            this.postList = new PostListModel();
        }
        
        setupListeners() {
            $(document).on('add-post:clicked', (event) => {
                this.addPostHandler(event.detail);
            });
            
            $(document).on('add-post:rendered', (event) => {
                this.displayPosts();
            });
            
            $(document).on('router:home', (event) => {
                new AddPostView();
            });
            
            $(document).on('router:post', (event) => {
                console.log('ROUTER: post chosen');
            });
        }
        
        addPostHandler(postData) {
            let postModel = new PostModel(postData);
            new PostView(postModel);
            this.postList.addPost(postModel);
            StorageService.setData(postModel);
        }
    
        displayPosts() {
            let storedPosts = StorageService.getData() || [];
            storedPosts.forEach((postData) => {
                let postModel = new PostModel(postData);
                new PostView(postModel);
            });
        }
    }
    
    new Application();
}(window));
