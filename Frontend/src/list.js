var $product_list = $("#product-container");
var Templates = require('./Templates');
var details = require('./details');
var api = require('./API');

var ProdList = [];
var noteItem_height = 67;

$('#mi').keypress(function(e) {
    if (e.which == 13 && this.value) {
        var value = document.getElementById("mi").value;
        window.location = "list.html?name="+value;
    }
});
$("#submit").click(function() {
    var value = document.getElementById("mi").value;
    window.location = "list.html?name="+value;
});

function resizeImg(){
    var length = ProdList.length;
    if((length*noteItem_height)>267){
        var currentHeight= $("#one_prod").find("img").height();
        $("#one_prod").find("img").height(currentHeight+noteItem_height);
        $("#one_prod").find("img").width($("#one_prod").find("img").width()+5);
    }
   
}


function showProducts(list) {
    
    var $note = $("#prodnote");
    $product_list.html("");

    function addToMyList(product) {

        idx = ProdList.findIndex(item=>item.product == product);
        if(idx<0){
       
        ProdList.push({
            product:product
       });
      // resizeImg();
       updateList();

    }
    }
    
    function updateList(){

         $note.html("");
         
         function showOneNoteItem(note_item){
            var html_c = Templates.Note_Item(note_item);
            var $itemNote = $(html_c);
            $note.append($itemNote);
            $itemNote.find(".close").click(function(){
                $(this).parent().remove();
            })
         }
    ProdList.forEach(showOneNoteItem);

    }
    function showOneProduct(product) {
        var html_code = Templates.BuyList_OneItem({ product: product });
        var $node = $(html_code);
        details.inputReady();
        $product_list.append($node);
       
        $node.find("span").click(function(){addToMyList(product)});
    }
    list.forEach(showOneProduct);
}
api.getProductList(function(err, productlist) {
    if (err) {
        //Обробляємо помилку,	якщо можемо або повертаємо її
        //return	callback(err);
    }
    showProducts(productlist)
});


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');
$(".name span").html(name);



// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");

for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {

        this.parentElement.remove();

      }

}
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#listik ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);



   // var contentHeight = (windowHeight - 25);

  //  contentElement.style.minHeight = contentHeight + "px";

  
   // if(currentContentHeight>2)
  //  var navigationElement = document.getElementById("navigation");
 //   var differenceInHeight = currentContentHeight - windowHeight;
  //  var navigationHeight = (windowHeight + differenceInHeight);

 //   navigationElement.style.minHeight = navigationHeight + "px";

