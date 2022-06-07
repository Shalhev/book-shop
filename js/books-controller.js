

const MAX_PRICE = 200
var gBooks = []
var gSortBy = ''
var gFilterByTxt = ''
var gFilterByPrice = MAX_PRICE
var gFilterByRate = 0

function init() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        console.log('No BOOKS, Create Books');
    } else {
        gBooks = books
    }
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    var books = getBooks()

    books = booksToDisplay(books)

    var strHTMLs = books.map(book => `
    <tr class="table-secondary">
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>$${book.price}</td>
    <td>${book.rate} ⭐</td>
    <td class="d-flex justify-content-evenly"><button data-trans="read-book" class="btn btn-sm btn-primary read-btn" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="onReadBook('${book.id}')">Read</button>
    <button data-trans="update-book" class="btn btn-sm btn-warning update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
    <button data-trans="delete-book" class="btn btn-sm btn-danger delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button></td>
    </tr>
    `)
    document.querySelector('table tbody').innerHTML = strHTMLs.join('')
    if (books.length === 0) {
        strHTMLs = `<tr class="bg-danger"><td colspan="5">NO BOOKS!</td></tr>`
        document.querySelector('table tbody').innerHTML = strHTMLs
    }
    updatePagesBts()
    saveBooksToStorage()
    doTrans()
}
function onSetSortBy(sort) {
    gSortBy = sort
    renderBooks()
}

function onAddBook() {
    addBook()
    renderBooks()
}

function onReadBook(bookId) {
    openModal(bookId)
}

function onUpdateBook(bookId) {
    updateBook(bookId)
    renderBooks()

}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function openModal(bookId) {
    const book = findBook(bookId)

    document.querySelector('.modal-title').innerText = book.name
    document.querySelector('.modal-body').innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laudantium rem perspiciatis deleniti consectetur, natus nihil facilis vero. Excepturi ad atque blanditiis sapiente dicta aliquid laboriosam nam consequatur sed voluptatem!'
    document.querySelector('.modal-footer').innerText = `$${book.price}`
    document.querySelector('h6 span').innerText = book.id



//     var elmodal = document.querySelector('.modal')
//     elmodal.innerHTML = `
//     <h1>${book.name}</h1>
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laudantium rem perspiciatis deleniti consectetur, natus nihil facilis vero. Excepturi ad atque blanditiis sapiente dicta aliquid laboriosam nam consequatur sed voluptatem!
//     <h3>Price: <span>$${book.price}</span><h3>
//     <h5>Book ID: ${book.id}</h5>
//     ⭐ Rate: ⭐
//     <div><button class="rate-btn rate-plus-btn">+</button>
//     <span class="rate-num">${book.rate}</span>
//     <button class="rate-btn rate-minus-btn">-</button></div>
//     <button class="close-btn" onclick="closeModal()">X</button>`
//     elmodal.style.display = 'block'

    var elRate = document.querySelector('.modal .rate-num')
    document.querySelector('.rate-plus-btn').onclick = () => {
        if (book.rate === 10) return
        book.rate++
        elRate.innerHTML = `${book.rate}`
        renderBooks()
    }
    document.querySelector('.rate-minus-btn').onclick = () => {
        if (book.rate === 0) return
        book.rate--
        elRate.innerHTML = `${book.rate}`
        renderBooks()
    }
}

function closeModal() {
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'none'
}

function onChangeRate(bookId) {
    const elRate = document.querySelector('[name=rate]')
    const rate = +elRate.value
    changeRate(rate, bookId)
}

function onSetFilterByTxt(txt) {
    gFilterByTxt = txt
    renderBooks()
}
function onSetFilterByPrice(price) {
    gFilterByPrice = price
    document.querySelector('.filters .price').innerHTML = gFilterByPrice
    renderBooks()
}

function onSetFilterByRate(rate) {
    gFilterByRate = rate
    renderBooks()
}



function onSortPrice() {
    if (gSortBy === 'priceLowtoHigh') {
        gSortBy = 'priceHightoLow'
    } else {
        gSortBy = 'priceLowtoHigh'
    }
    renderBooks()
}
function onSortTitle() {
    if (gSortBy === 'titleAtoZ') {
        gSortBy = 'titleZtoA'
    } else if (gSortBy = 'titleZtoA') {
        gSortBy = 'titleAtoZ'
    }
    renderBooks()
}

function renderFilterByQueryStringParams() {
    // Retrieve data from the current query-params
    const queryStringParams = new URLSearchParams(window.location.search)

    gSortBy = queryStringParams.get('sort') || ''
    gFilterByPrice = +queryStringParams.get('maxprice') || MAX_PRICE
    gFilterByTxt = queryStringParams.get('search') || ''
    gFilterByRate = +queryStringParams.get('rate') || 0

    if (!gSortBy && !gFilterByPrice && !gFilterByTxt && !gFilterByRate) return

    if (gSortBy) document.querySelector('.sortBy').value = gSortBy
    document.querySelector('[name=filter-price]').value = gFilterByPrice
    document.querySelector('.filters span.price').innerHTML = gFilterByPrice
    document.querySelector('[name=search]').value = gFilterByTxt
    document.querySelector('.sort-rate').value = gFilterByRate
}

function onNextPage(){
    nextPage()
    renderBooks()
}

function onBackPage(){
    backPage()
    renderBooks()
}