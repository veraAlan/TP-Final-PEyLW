// Product loading from different pages.
async function productsMain() {
    const d = document
    const b = d.querySelector('body')
    const productsMain = b.querySelector('.products-main')

    const requestURL = "./database/products.json"
    const request = new Request(requestURL)
    const response = await fetch(request)
    const pDBText = await response.text()
    const pDB = JSON.parse(pDBText)

    const productList = d.createElement('div')
    productList.classList.add('card')
    productList.classList.add('bg-lg-dark')

    pDB.forEach(product => {
        const classes = addClassFeature(pDB.indexOf(product))
        productList.innerHTML += '<hr class="featurette-divider py-2"><div class="card fg-dark "><div class="row featurette text-light"><div class="col-md-7'
            + classes[0] + '"><h2 class="featurette-heading fw-normal lh-1 p-4">' + product.productName +
            '</h2><p class="lead">' + product.description + '</p><button type="button" class="btn me-3 btn-outline-light btn-dark w-100" onclick="cartAddProducts(\'' + product.productName + '\')">Comprar</button></div><div class="col-md-5' + classes[1]
            + '"><img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="' +
            product.image + '" class="feature-img" alt="' + product.productName + '"></div></div></div>'
        productsMain.appendChild(productList)
    })
}

function addClassFeature(num) {
    var string = []
    num % 2 == 0 ? string = [" order-md-2", " order-md-1"] : string = [" px-5", ""]
    return string
}

async function loadProductsType() {
    const d = document
    let params = new URLSearchParams(location.search)
    type = params.get('type')
    const b = d.querySelector('body')
    const productsMain = b.querySelector('.product-page')

    const requestURL = "./database/products.json"
    const request = new Request(requestURL)
    const response = await fetch(request)
    const pDBText = await response.text()
    const pDB = JSON.parse(pDBText)

    const productList = d.createElement('div')
    productList.classList.add('row')
    productList.classList.add('row-cols-1')
    productList.classList.add('row-cols-md-3')
    productList.classList.add('p-1')

    pDB.forEach(product => {
        product['tags'].forEach(tag => {
            if (tag == type) {
                productList.innerHTML += '<div class="col"><div class="card m-2 fg-dark">' +
                    '<img src="' + product.image + '" class="card-img-top" alt="' + product.productName + '">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title text-light">' + product.productName + '</h5>' +
                    '<p class="card-text text-light">' + product.description + '</p>' +
                    '<h5>AR$ ' + product.price + '</h5></div>' +
                    '<div class="card-footer">' +
                    '<button type="button" class="btn me-3 btn-dark w-100" onclick="cartAddProducts(\'' + product.productName + '\')">Comprar</button>' +
                    '</div></div></div>'
                productsMain.appendChild(productList)
            }
        })
    })
}

async function loadProductCart() {
    const d = document
    const b = d.querySelector('body')
    const cartProductsCards = b.querySelector('.cart-page')

    const requestURL = "./database/products.json"
    const request = new Request(requestURL)
    const response = await fetch(request)
    const pDBText = await response.text()
    const pDB = JSON.parse(pDBText)

    cart = localStorage.getItem('cart').split(',')

    const productList = d.createElement('div')
    productList.classList.add('row')
    productList.classList.add('row-cols-1')
    productList.classList.add('row-cols-md-3')
    productList.classList.add('p-1')

    cart.forEach(cartProduct => {
        const product = pDB.find(product => product.productName == cartProduct)
        productList.innerHTML += '<div class="col"><div class="card m-2 fg-dark">' +
            '<img src="' + product.image + '" class="card-img-top" alt="' + product.productName + '">' +
            '<div class="card-body">' +
            '<h5 class="card-title text-light">' + product.productName + '</h5>' +
            '<p class="card-text text-light">' + product.description + '</p>' +
            '<h5 class="text-light"> AR$ ' + product.price + '</h5 ></div > ' +
            '<div class="card-footer">' +
            '<button type="button" class="btn me-3 btn-dark w-100" onclick="removeProduct(\'' + product.productName + '\', this)">Eliminar</button>' +
            '</div></div></div>'
        cartProductsCards.appendChild(productList)
    })
}

// Cart functions
function cartAddProducts(name) {
    cart = localStorage.getItem('cart').split(',')
    cart = [...cart, name]
    localStorage.setItem('cart', cart)
}

async function cartTotal() {
    var total = 0

    totalElement = document.querySelector("#cartTotalPay")

    const requestURL = "./database/products.json"
    const request = new Request(requestURL)
    const response = await fetch(request)
    const pDBText = await response.text()
    const pDB = JSON.parse(pDBText)

    cart.forEach(productName => {
        p = pDB.find(product => productName == product.productName)
        total += p.price
    })

    totalElement.innerHTML = "Total: AR$" + total
}

function removeProduct(productName) {
    var index = cart.indexOf(productName)
    cart.splice(index, 1)

    localStorage.setItem('cart', cart)
    removeDivProduct(productName)
    cartTotal()
}

function removeDivProduct(name) {
    rowProd = document.querySelectorAll(".col")

    for (var i = 0; i < rowProd.length; i++) {
        col = rowProd.item(i)
        child = col.children[0].innerHTML
        if (child.indexOf(name) > -1) {
            col.parentNode.removeChild(col)
            i = rowProd.length
        }
    }
}