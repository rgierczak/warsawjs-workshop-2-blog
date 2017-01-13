(function (root) {
    let StorageService = {
        setData(data){
            let storedData = this.getData() || [];
            storedData.push(data);
            localStorage.setItem('posts', JSON.stringify(storedData));
        },
        
        getData() {
            return JSON.parse(localStorage.getItem('posts'));
        }
    };
    
    root.Blog.StorageService = StorageService;
}(window));
