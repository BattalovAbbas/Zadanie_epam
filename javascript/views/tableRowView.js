(function () {
  Table.views.tableRowView = (function () {
    var table = document.getElementById('bodyTable');
      
    // Добавление новой строки в таблицу
    function RowAdd(product) {        
        var newRow = document.createElement("tr");        
        var tdNameAndCount = document.createElement("td");
        var uName = document.createElement("u");
        var divCount = document.createElement("div");
        var tdPrice = document.createElement("td");
        var tdButton = document.createElement("td");        
        var idTitle = document.createElement("title"); 
        uName.className = "textName";
        divCount.className = "textCount";
        tdButton.className = "btn-toolbar";
        var formatter = new Intl.NumberFormat('en-US', { style: 'currency',currency: 'USD'});                
        idTitle.innerHTML = product.id;      
        tdButton.appendChild(product.btnEdit);
        tdButton.appendChild(product.btnDelete);
        newRow.appendChild(tdNameAndCount);
        newRow.appendChild(tdPrice);
        newRow.appendChild(tdButton);
        newRow.appendChild(idTitle);
        table.appendChild(newRow);
        uName.innerHTML = product.name;
        divCount.innerHTML = product.count;
        tdNameAndCount.appendChild(uName);
        tdNameAndCount.appendChild(divCount);        
        tdPrice.innerHTML = formatter.format(product.count*product.price);         
    }	

    // Удаление, выделение, и обновление сроки на основе поиска товара по id записанного в title
    function RowDelete(product) {
        var elements = document.getElementsByTagName('title');
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].innerHTML == product.id){
                table.deleteRow(i);
                alert("Удален "+  product.name + " номер в базе=" + product.id + " номер в таблице=" + (i));       
                return;
            }
        }
    }
    // Возвращает позицию в таблице 
    function RowSelect(product) {
        var elements = document.getElementsByTagName('title');
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].innerHTML == product.id){    
                return elements[i].parentElement.offsetTop;
            }
        }
    }
      
    function RowUpdate(product) {
        var elements = document.getElementsByTagName('title');
        var formatter = new Intl.NumberFormat('en-US', { style: 'currency',currency: 'USD'});
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].innerHTML == product.id){ 
                table.rows[i].cells[0].childNodes[0].innerHTML = product.name;
                table.rows[i].cells[0].childNodes[1].innerHTML = product.count;                
                table.rows[i].cells[1].innerHTML = formatter.format(product.count*product.price);                
                alert("Товар изменен "+  product.name + " номер в базе=" + product.id + " номер в таблице=" + (i));       
                return;
            }
        }
    } 
      
    // Очистка таблицы 
    function AllRowsDelete(){
        var elements = document.getElementsByTagName('title');
        while(elements.length>0){
             table.deleteRow(0);
        }
    }
    return {
        RowAdd: RowAdd,
        RowUpdate: RowUpdate,
        RowDelete:RowDelete,
        AllRowsDelete:AllRowsDelete,
        RowSelect: RowSelect 
    }
    
    })();
})();