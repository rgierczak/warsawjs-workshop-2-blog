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
            // Sprawdź, czy istnieją posty w LocalStorage. Jeśli tak, wyświetl je w pętli.
            
            new AddPostView();
            this.setupListeners();
        }
        
        setupListeners() {
            $(document).on('addPost', (event) => {
                this.addPostHandler(event.detail);
            });
        }
        
        addPostHandler(postData) {
            let post = new PostModel(postData);
            this.postList.addPost(post);
            StorageService.setData(post);
            this.postView = new PostView(post);
        }
    }
    
    new Application();
}(window));
