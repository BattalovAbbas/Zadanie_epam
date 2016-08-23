(function () {
    Table.controllers.tableControllers = (function () {
       
        var productsListModel =  Table.models.productsListModel;
        var tableRowView =  Table.views.tableRowView;
        var validation = Table.controllers.validation; 
        var modalWindow = Table.controllers.modalWindow;        
        var tooltips =  Table.views.tooltips;
        var selectIdEdit;
          
       // Привязка функционала к кнопкам
        $(document).ready(function(){
            $("#btnAddOrUpdate").click(function() {
                if(document.getElementById("btnAddOrUpdate").value == "Add"){
                    AddProductController(); 
                }
                else{
                    UpdateProductController();
                }
            });
        });        
        document.getElementById("btnAddNew").onclick = function() { AddNewButton() };       
        document.getElementById("sortingName").onclick = function() { Sorting("Name") };
        document.getElementById("sortingPrice").onclick = function() { Sorting("Price")};
        document.getElementById("btnSeacrh").onclick = function() { RowsFilter() };   
        document.onkeyup = function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {              
                if(document.getElementById("btnAddOrUpdate").value == "Add"){
                    AddProductController(); 
                }
                else {
                    UpdateProductController();
                }
            }
            return false;
        }
        
        document.getElementById('inputName').focus();
        // Изменение позиции модального окна относительно размеров окна браузера
        $(window).resize(function(){
            modalWindow.OnresizeModal( document.getElementById("table").offsetWidth);
        });
        
        // Добавление подсказок
        tooltips.AddTooltip("btnAddOrUpdate","Добавить/Изменить");
        tooltips.AddTooltip("inputName","Длина поля не может превышать 15 символов или быть пустой");
        
        // Очистка всех полей ввода
        function AddNewButton(){
            document.getElementById("btnAddOrUpdate").value = "Add";
            document.getElementById('inputName').value = null;
            document.getElementById('inputCount').value = null;
            document.getElementById('inputPrice').value = null;
            document.getElementById('inputName').style.backgroundColor = null;
            document.getElementById('inputCount').style.backgroundColor = null;
            document.getElementById('inputPrice').style.backgroundColor = null;
        }
        
        // Открытие модального окна, удаление товара из базы и сторки из таблицы 
        function DeleteButton(id){
            var selectProduct = productsListModel.FindProduct(id);
            if(selectProduct != null){
                var indexTable = tableRowView.RowSelect(selectProduct);                 
                modalWindow.Show(selectProduct, indexTable, function(value) {
                    if(value) {
                        productsListModel.DeleteProduct(selectProduct.id);
                        tableRowView.RowDelete(selectProduct);
                    }
                });  
            }
            else {
                alert("id not found");
            }
        }        
        
        // Поиск товара в базе для дальнейшего изменения
        function EditButton(id){            
            document.getElementById("btnAddOrUpdate").value = "Update";
            var selectProduct = productsListModel.FindProduct(id);
            if(selectProduct != null){
                document.getElementById('inputName').value = selectProduct.name;
                document.getElementById('inputCount').value = selectProduct.count;
                document.getElementById('inputPrice').value = selectProduct.price;
                document.getElementById('inputName').style.backgroundColor = null;
                document.getElementById('inputCount').style.backgroundColor = null;
                document.getElementById('inputPrice').style.backgroundColor = null;
                selectIdEdit = id;
            }
            else {
                alert("id not found");
            }
        }
        
        // Добавление продукта в базу, привязка кнопок и вывод в таблицу
        function AddProductController(){                           
            var name = validation.checkName('inputName');
            var count =  validation.checkCount('inputCount');
            var price = validation.checkPrice('inputPrice');
            if(name != "" && count !=="" && price!=""){
                var btnEdit = document.createElement("button");
                var btnDelete = document.createElement("button");            
                btnEdit.innerHTML = "Edit";
                btnDelete.innerHTML = "Delete";
                btnEdit.className = "btn btn-sm btn-primary";
                btnDelete.className = "btn btn-sm btn-danger";             
                productsListModel.AddProduct(name,count,price);   
                var lastProduct = productsListModel.GetLastProduct();
                btnEdit.onclick = function(){ EditButton(lastProduct.id) };
                btnDelete.onclick = function(){ DeleteButton(lastProduct.id) };
                lastProduct.btnEdit = btnEdit;
                lastProduct.btnDelete = btnDelete;
                tableRowView.RowAdd(lastProduct); 
                AddNewButton();
                document.getElementById('inputName').focus();
            }
        }
        
        // Обновление продукта в базе и изменение строки в таблице
        function UpdateProductController(){                            
            var name = validation.checkName('inputName');
            var count =  validation.checkCount('inputCount');
            var price = validation.checkPrice('inputPrice');
            if(name != "" && count !=="" && price!=""){
                productsListModel.UpdateProduct(selectIdEdit, name,count,price);
                var selectProduct = productsListModel.FindProduct(selectIdEdit);
                tableRowView.RowUpdate(selectProduct); 
                AddNewButton();
                document.getElementById('inputName').focus();
            }
        } 
        
        // Фильтрация
        function RowsFilter(){  	           
            var productsList = productsListModel.GetProductsFilter(document.getElementById("inputSearch").value);
            tableRowView.AllRowsDelete();
            for(product in productsList){                
                tableRowView.RowAdd(productsList[product]); 
            }
        }
        
        // Сортировка и вывод товаров
        function Sorting(title){
            var productsList = productsListModel.GetProducts();
            tableRowView.AllRowsDelete();            
            var compare = (title == "Name") ? compareName : comparePrice;
            var ElementId = (title == "Name") ? "sortingName" : "sortingPrice";
            productsList.sort(compare);
            if(document.getElementById(ElementId).className == "triangle-up"){
                document.getElementById(ElementId).className = "triangle-down";  
                productsList.reverse();
            }
            else{
                document.getElementById(ElementId).className = "triangle-up";
            }
            for(product in productsList){                
                tableRowView.RowAdd(productsList[product]); 
            }
        }    
        // Сотрировка для общих цен
        function comparePrice(productA, productB) {
            return productA.price * productA.count - productB.price * productB.count;
        }
        // Сортировка для имён
        function compareName(productA, productB) {
            return productA.name > productB.name;
        }
        
        return {
            AddProductController: AddProductController,
            AddNewButton: AddNewButton,
            UpdateProductController: UpdateProductController,
            DeleteButton: DeleteButton,
            EditButton: EditButton,
            RowsFilter: RowsFilter
        }        
    })();    
})();