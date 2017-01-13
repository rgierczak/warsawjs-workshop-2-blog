(function (root) {
    'use strict';
    
    let PostView = root.Blog.PostView;
    let AddPostView = root.Blog.AddPostView;
    
    let PostModel = root.Blog.PostModel;
    let PostListModel = root.Blog.PostListModel;
    
    let StorageService = root.Blog.StorageService;
    
    class Application {
        constructor() {
            this.postList = new PostListModel();
    
            new AddPostView();
            this.displayPosts();
            this.setupListeners();
        }
        
        displayPosts() {
            let storedPosts = StorageService.getData() || [];
    
            storedPosts.forEach((postData) => {
                let postModel = new PostModel(postData);
                new PostView(postModel);
            });
        }
        
        setupListeners() {
            $(document).on('addPost', (event) => {
                this.addPostHandler(event.detail);
            });
        }
        
        addPostHandler(postData) {
            let postModel = new PostModel(postData);
            new PostView(postModel);
            this.postList.addPost(postModel);
            StorageService.setData(postModel);
        }
    }
    
    new Application();
}(window));
