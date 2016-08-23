(function () {
  Table.controllers.modalWindow = (function () {
       
    // Загрузка и открытие модального окна  
    function Show(product, index, callback){
        var form = document.getElementById('formDelete');
        var container = document.getElementById('containerDelete');    
        container.style.display = 'block';
        form.style.marginLeft = document.getElementById("table").offsetWidth+document.getElementById("table").offsetWidth/4;
        form.style.marginTop = index+90;        
        document.getElementById('messageDelete').innerHTML = "Удалить "+product.name+"?";
        document.getElementById("btnModalOk").onclick = function() { modalOk() };       
        document.getElementById("btnModalCancel").onclick = function() { modalCancel() };
        
        function modalOk(){
            container.style.display = 'none';
            callback(true);
        } 

        function modalCancel(){
            container.style.display = 'none';
            callback(false);
        } 
    }
      
    // Динамическое изменение позиции окна
    function OnresizeModal(left){
        document.getElementById('formDelete').style.marginLeft = left+left/15;
    }
      
    return {
        Show: Show,
        OnresizeModal: OnresizeModal
    }
  })();    
})();