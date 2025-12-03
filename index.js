var productName=document.getElementById("ProductName");
var productPrice=document.getElementById("ProductPrice");
var productCategory=document.getElementById("ProductCategory");
var productDescription=document.getElementById("ProductDescription");
var addBtn=document.getElementById("MainId");
console.log(productName,productPrice,productCategory,productDescription);
var Products;
var ErrorsDiv=document.getElementById("Error");
ErrorsDiv.hidden=true;

var error="";
if(localStorage.getItem("productsList")==null){
    Products=[];
}
else{
   Products=JSON.parse( localStorage.getItem("productsList"));
    displayProducts();
}
function addProduct(){
    if(!CheckInputs()){
        alert("Please fill in all fields.");
        return;
    }
    if(validateProductName()&&validateProductPrice()&&validateProductCategory()&&validateProductDescription()){
        var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value
    };
    Products.push(product);
    localStorage.setItem("productsList",JSON.stringify(Products));
    console.log(product);
    clearForm();
    displayProducts();
    
    }
    else{
          error="Please enter valid data in all fields.";
        ErrorsDiv.hidden=false;
        ErrorsDiv.innerHTML=error;
        return;
    }
   
}
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDescription.value="";
}
function CheckInputs(){
    if(productName.value=="" || productPrice.value=="" || productCategory.value=="" || productDescription.value=="")
        {
            return false;}
    else{
        return true;
    }

}
function displayProducts(){
    var cartona=``;
    for(var i=0;i<Products.length;i++){
        cartona+=`<tr>
        <td>${i}</td>
        <td>${Products[i].name}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].category}</td>
        <td>${Products[i].description}</td>
         <td><button onclick='ChangFormToUpdate(${i})' class="btn btn-outline-warning">Update</button></td>
        <td><button onclick='DeleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    }       
    document.getElementById("tableBody").innerHTML=cartona;
}
function DeleteProduct(index){
    Products.splice(index,1);
    localStorage.setItem("productsList",JSON.stringify(Products));
    displayProducts();
}
function ProductSearch(searchTerm){
    var cartona=``;
     for(var i=0;i<Products.length;i++){
        if(Products[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
        cartona+=`<tr>
        <td>${i}</td>
        <td>${Products[i].name}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].category}</td>
        <td>${Products[i].description}</td>
        <td><button onclick='ChangFormToUpdate(${i})' class="btn btn-outline-warning">Update</button></td>
        <td><button onclick='DeleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
}
    }       
    document.getElementById("tableBody").innerHTML=cartona;
}
function ChangFormToUpdate(index){
    productName.value=Products[index].name;
    productPrice.value=Products[index].price;
    productCategory.value=Products[index].category;
    productDescription.value=Products[index].description;
    addBtn.innerHTML="Update Product";
    addBtn.onclick=function(){
        UpdateProduct(index);
        addBtn.innerHTML="Add Product";
        addBtn.onclick=addProduct;
    };
}
function UpdateProduct(index){
    Products[index].name=productName.value;
    Products[index].price=productPrice.value;
    Products[index].category=productCategory.value;
    Products[index].description=productDescription.value;
    localStorage.setItem("productsList",JSON.stringify(Products));
    clearForm();
    displayProducts();
}
function validateProductName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    if(regex.test(productName.value)){
        return true;
    }
    else{
        return false;   
    }
}
function validateProductPrice(){
    var regex=/^[1-9][0-9]{2,5}$/;
    if(regex.test(productPrice.value)){
        return true;
    }
    else{
        return false;
    }
}
function validateProductCategory(){
    var regex=/^[A-Za-z]{3,10}$/;
    if(regex.test(productCategory.value)){
        return true;
    }
    else{
        return false;
    }
}
function validateProductDescription(){
    var regex=/^[A-Za-z0-9\s]{5,100}$/;
    if(regex.test(productDescription.value)){
        return true;
    }
    else{
        return false;
    }
}
