(function () {
  Table.models.productsListModel = (function () {
    
    var productsList = [];
    var idCounter = 0;
      
    function GetProducts() {
        return productsList;
    }
    function GetLastProduct(){
        return productsList[productsList.length-1];
    }

    function AddProduct(Name, Count, Price){
        var product = new Object();
        product.id = idCounter;
        product.name = Name;
        product.count = Count;
        product.price = Price;
        productsList.push(product);
        idCounter++;
    }
      
    function FindProduct(id) {
        for(var product in productsList)
        {
            if(productsList[product].id == id)
            {
                 return productsList[product];
            }            
        }
        return null;
    }

    function DeleteProduct(id) {
        for(var product in productsList)
        {
            if(productsList[product].id == id)
            {
                productsList.splice(product, 1);
                return;
            }            
        }
    }
      
    function UpdateProduct(Id,Name, Count, Price) {     
        for(var product in productsList)
        {
            if(productsList[product].id == Id)
            {
                productsList[product].name = Name;
                productsList[product].count = Count;
                productsList[product].price = Price;
                return;
            }            
        }
    } 
      
    // Поиск товаров подходящих под фильтр, на основе поиска подстроки
    function GetProductsFilter(filter){
       var productsListNew = [];
       for(var product in productsList)
        {
            if(productsList[product].name.toLowerCase().indexOf(filter.toLowerCase())>-1)
            {
                productsListNew.push(productsList[product]);
            }            
        }
        return productsListNew;
    }

    return {
        GetProducts: GetProducts,
        GetLastProduct: GetLastProduct,
        UpdateProduct: UpdateProduct,
        AddProduct: AddProduct,
        DeleteProduct: DeleteProduct,
        FindProduct: FindProduct,
        GetProductsFilter:GetProductsFilter
    }

    })();
})();