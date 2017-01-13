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
                console.log('ROUTER: HOME');
                new AddPostView();
            });
            
            $(document).on('router:post', (event) => {
                let postId = parseInt(event.detail.id);
                let postModel = this.postList.getPost(postId);
                console.log('ROUTER: POST: ', postModel);
            });
        }
        
        addPostHandler(postData) {
            StorageService.setData(this.createPost(postData));
        }
    
        displayPosts() {
            let storedPosts = StorageService.getData() || [];
            storedPosts.forEach((postData) => {
                this.createPost(postData);
            });
        }
    
        createPost(postData) {
            let postModel = new PostModel(postData);
            this.postList.addPost(postModel);
            new PostView(postModel);
            return postModel;
        }
    }
    
    new Application();
}(window));
