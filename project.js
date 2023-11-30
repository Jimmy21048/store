let myClothes = document.getElementById("clothes");
let myShoes = document.getElementById('shoes');
let myBeddings = document.getElementById('beddings');

const products = [
    [
        {name:'jackets',price:2000,source:'images/jacket.jfif'},
        {name:'shirts',price:1000,source:'images/shirt.jfif'},
        {name:'trousers',price:1200,source:'images/trouser.jfif'},
        {name:'shorts',price:800,source:'images/shorts.jfif'},
        {name:'socks',price:100,source:'images/socks.jfif'}
    ],
    [
        {name:'slippers',price:300,source:'images/slippers.jfif'},
        {name:'sneakers',price:1500,source:'images/sneakers.jfif'},
        {name:'officials',price:2500,source:'images/official.jfif'},
        {name:'open shoes',price:2200,source:'images/open.jfif'},
        {name:'rubber shoes',price:500,source:'images/rubbers.jfif'}
    ],
    [
        {name:'bedsheets',price:2000,source:'images/bedsheet.jfif'},
        {name:'blankets',price:2500,source:'images/blanket.jfif'},
        {name:'pillows',price:1200,source:'images/pillow.jfif'},
        {name:'pajamas',price:800,source:'images/pajama.jfif'},
        {name:'mattresses',price:5000,source:'images/mattress.jfif'}
    ]
]
// mapping different items on the products list
let addClothes ='';
let addShoes ='';
let addBeddings = '';

for(let i=0;i<products.length;i++) {
    for(let j=0;j<products[i].length;j++) {
        if(i === 0) {
            addClothes+=`
            <button onclick="clicked(this.id)" id='${products[i][j].name}' value='${products[i][j].price}' name="${products[i][j].name}"><img src="${products[i][j].source}" alt="${products[i][j].name}">${products[i][j].name.toUpperCase()}</button>`
        }
        if(i === 1) {
            addShoes+=`
            <button onclick="clicked(this.id)" id='${products[i][j].name}' value='${products[i][j].price}' name="${products[i][j].name}"><img src="${products[i][j].source}" alt="${products[i][j].name}">${products[i][j].name.toUpperCase()}</button>`
        }
        if(i === 2) {
            addBeddings+=`
            <button onclick="clicked(this.id)" id='${products[i][j].name}' value='${products[i][j].price}' name="${products[i][j].name}"><img src="${products[i][j].source}" alt="${products[i][j].name}">${products[i][j].name.toUpperCase()}</button>`
        }
    }
}
    myClothes.innerHTML= addClothes;
    myShoes.innerHTML= addShoes;
    myBeddings.innerHTML= addBeddings;
    ////////////////////////////////////

function clothes() {
    myClothes.style.display='grid'
    myShoes.style.display='none'
    myBeddings.style.display='none'
}
function shoes() {
    myClothes.style.display='none'
    myShoes.style.display='grid'
    myBeddings.style.display='none'
}
function beddings() {
    myClothes.style.display='none'
    myShoes.style.display='none'
    myBeddings.style.display='grid'
}




function clicked(opt) {
    let selectedItem = document.getElementById('selected-product');
    for(let i=0;i<products.length;i++) {
        for(let j=0;j<products[i].length;j++) {
            if(opt === products[i][j].name) {
                selectedItem.innerHTML = `<div class='lucky-item'>
                    <div class='info'>
                        <p class='item-name'>${products[i][j].name.toUpperCase()}</p>
                        <p>Welcome to Ng'ara</p>
                        <p>Get quality ${products[i][j].name} at the best market price</p>
                        <p>Get discount for purchases totalling ksh. 10000</p>
                    </div>
                    <div class='right'>
                    <img id='item-image' src='${products[i][j].source}' alt='${products[i][j].name}'/>
                    <button onclick='addToCart()'>Add to cart</button>
                    <p class='item-price'>${products[i][j].price}</p>
                    </div>
                </div>`
            }
        }
    }
}


let cartPage = document.getElementById('cart-page');
let cartPageContainer = document.querySelector('.cart-page-container');
let productPage = document.querySelector('.products');
let tabSection = document.querySelector('.tabs');

function clickedCart() {
    cartPage.style.display = 'flex';
    productPage.style.display = 'none';
    tabSection.style.display = 'none';
}
function goBack() {
    cartPage.style.display = 'none';
    productPage.style.display = 'initial';
    tabSection.style.display = 'flex';
}


let cartArray = [];

function mapArray(item) {
    return item.map((obj) => {
        return `<div class='cart-item' >
            <img src='${obj[2]}' alt='${obj[0]}'/>
            <p>${obj[0]}</p>
            <p>${obj[1]}</p>
            <button id='${obj}' onclick='removeFromCart(this.id)'>REMOVE</button>
        </div> `
    }).join("");
}

function displayPrices(item) {
    let totalPrice=0;
    let pricesArray = [];
    item.forEach((obj) => {
        totalPrice+=parseInt(obj[1]);
    })
    let discountEligible ='Eligible for discount';
    if(totalPrice<10000) {
        discountEligible = `Not eligible for discount, ${10000- totalPrice} to discount`;
    }

    pricesArray.push(totalPrice,discountEligible);
    let itemNumber = document.getElementById('item-number');
    itemNumber.innerHTML =cartArray.length;
    return `<div class='cart-item cart-item-last'>Total:Ksh. ${pricesArray[0]}
    <p>${pricesArray[1]}</p>
    <button onclick='goBack()'>BACK</button>
    </div>`
}

function postCartPage() {
    cartPage.innerHTML =displayPrices(cartArray) + mapArray(cartArray);
}

function addToCart() {
    let itemName = document.querySelector('.item-name');
    let itemPrice = document.querySelector('.item-price');
    let itemImageSource = document.getElementById('item-image').getAttribute('src');
    cartArray.push([itemName.innerHTML,itemPrice.innerHTML, itemImageSource]);
    postCartPage();
}

function removeFromCart(id) {
    console.log(id);
    let temp=id.split(",");
    let temp1 = Object.entries(id);
    console.log(temp1);
    cartArray = cartArray.filter((item) => {
        return item[0] !== temp[0];
    })
    postCartPage();
}


