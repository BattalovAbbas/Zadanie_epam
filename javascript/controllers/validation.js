(function () {
  Table.controllers.validation = (function () {
      
       // Проверка имени, количества и цены на корректность
       function checkName(ElementId){  
           var name = document.getElementById(ElementId).value;
           if((name === '') || (name.length > 15) || (/^\s+$/.test(name))) {
               document.getElementById(ElementId).style.backgroundColor = "red";
               return "";
           }
           else {
               document.getElementById(ElementId).style.backgroundColor = null;
               return name;
           }
       }
      
      function checkCount(ElementId){  
           var count = document.getElementById(ElementId).value;
           if(/[^0-9]/g.test(count) || count == '') {
               document.getElementById(ElementId).style.backgroundColor = "red";
               return "";
           }
           else {
               document.getElementById(ElementId).style.backgroundColor = null;
               return count;
           }
       }
      function checkPrice(ElementId){  
           var price = document.getElementById(ElementId).value;
           if(!/^(0$|[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/g.test(price) || price == '') {
               document.getElementById(ElementId).style.backgroundColor = "red";
               return "";
           }
           else {
               document.getElementById(ElementId).style.backgroundColor = null;
               return price;
           }
       }
       return {
            checkName: checkName,
            checkCount:checkCount,
            checkPrice:checkPrice
       }
    })();    
})();