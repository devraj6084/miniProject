let url = "https://dummyjson.com/products?limit=194";
async function getProducts() {
    let res = await fetch(url);
    let data = await res.json();

    let container = document.getElementById("container");

    // console.log(data);

    data.products.forEach((product) => {
        let card = document.createElement("div");
        card.classList.add("card");

        

        let title = document.createElement("h3");
        title.innerText = product.title;

        let image = document.createElement("img");
        image.src = product.thumbnail;

        let price = document.createElement("p");
        price.innerText = `₹${Math.floor(product.price * 94)}`

        let desc = document.createElement("p");
        desc.innerText = product.description;

        let cartsection = document.createElement("div");
        cartsection.classList.add("cart-section");

        let details = document.createElement("a");
        details.innerHTML = "Details";
        details.href = "details.html";
        details.classList.add("details-btn");


        details.addEventListener("click", () => {
            localStorage.setItem("productID" , product.id);
        });

        let cart = document.createElement("button");
        cart.innerHTML = "Add to CART"
        cart.addEventListener("click", () => {

            let itemid = product.id;

            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            if(!cartItems.includes(itemid)){
                cartItems.push(itemid);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                alert("Item added to cart!");
            }else{
                alert("Already in cart!");
            }

        });

        
        card.append(title, image, desc, price, cartsection);
        cartsection.append(details, cart);
        container.appendChild(card);


    })
}


async function getProductDetails(){
    let id = localStorage.getItem("productID");
    let res = await fetch(`https://dummyjson.com/products/${id}`);
    let data = await res.json();

    let outer = document.getElementById("details-container");
    

    let div1 = document.createElement("div");
    let title = document.createElement("h1");
    title.innerText = data.title;
    div1.classList.add("title-div");
    div1.append(title);


    let div2 = document.createElement("div");
    let image = document.createElement("img");
    image.src = data.thumbnail;
    div2.classList.add("image-div");
    div2.append(image);

    let div3 = document.createElement("div");
    let desc = document.createElement("p");
    desc.innerText = data.description;
    div3.classList.add("desc-div");
    div3.append(desc);

    let div4 = document.createElement("div");
    let price = document.createElement("p");
    price.innerText = `₹${Math.floor(data.price * 94)}`;
    div4.classList.add("price-div");
    div4.append(price);

    
    
    outer.append(div1, div2, div3, div4);


}

async function getCartItem(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let outer = document.querySelector("#outerBox");


    cart.forEach(async (id) => {
        let res = await fetch(`https://dummyjson.com/products/${id}`);
        let data = await res.json();

        let card = document.createElement("div");
        card.classList.add("card");

        let title = document.createElement("h1");
        title.innerText = data.title;

        let photo = document.createElement("img");
        photo.src = data.thumbnail;

        let price = document.createElement("p");
        price.innerText = `₹${Math.floor(data.price * 94)}`;

        
        let buy = document.createElement("button");
        buy.innerText = "BUY";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";

        deleteBtn.addEventListener("click", () => {
            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    

            cartItems = cartItems.filter(itemId => itemId !== id);
    
            localStorage.setItem("cart", JSON.stringify(cartItems));
    
    
            card.remove();
        });

        deleteBtn.classList.add("delete-btn");
        buy.classList.add("buy-btn");

        card.append(title,photo,price, buy, deleteBtn);
        outer.append(card);

    });

    
    
}

if (document.getElementById("container")) {
    getProducts();
}

if (document.getElementById("details-container")) {
    getProductDetails();
}

if(document.getElementById("outerBox")){
    getCartItem();
}

if(document.getElementById("l2")){
    document.getElementById("l2").addEventListener("click", () => {
        window.location.href = "cart.html";
    });
}