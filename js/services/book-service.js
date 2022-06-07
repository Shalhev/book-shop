
const PAGE_SIZE = 5
const STORAGE_KEY = 'books'
var gPageIdx = 0
var gBooksFiltered = 0

function addeBook(name, price) {
    const book = {
        id: _makeId(),
        name,
        price,
        imgUrl: '',
        rate: 0,
    }
    return book
}

function backPage() {

    gPageIdx--
}

function nextPage() {
    gPageIdx++
}

function updatePagesBts() {
    if (gPageIdx === 0) {
        document.querySelector('.back-page-btn').disabled = true
    } else {
        document.querySelector('.back-page-btn').disabled = false
    }
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooksFiltered) {
        document.querySelector('.next-page-btn').disabled = true
    } else {
        document.querySelector('.next-page-btn').disabled = false
    }

}


function getBooks() {
    return gBooks
}
 
function booksToDisplay(books) {
    if (gSortBy === 'rate') books.sort((a, b) => { return b.rate - a.rate });
    else if (gSortBy === 'priceLowtoHigh') books.sort((a, b) => { return a.price - b.price });
    else if (gSortBy === 'priceHightoLow') books.sort((a, b) => { return b.price - a.price });
    else if (gSortBy === 'price') books.sort((a, b) => { return a.price - b.price });
    else if (gSortBy === 'titleAtoZ') books.sort((a, b) => a.name.localeCompare(b.name))
    else if (gSortBy === 'titleZtoA') books.sort((a, b) => b.name.localeCompare(a.name))
    else if (gSortBy === 'title') books.sort((a, b) => a.name.localeCompare(b.name))

    books = books.filter(book => book.name.toLowerCase().includes(gFilterByTxt.toLowerCase()))
    books = books.filter(book => book.price <= gFilterByPrice)
    books = books.filter(book => book.rate >= gFilterByRate)

    gBooksFiltered = books.length
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)


    const queryStringParams = `?sort=${gSortBy}&rate=${gFilterByRate}&maxprice=${gFilterByPrice}&search=${gFilterByTxt}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

    return books
}

function addBook() {
    const name = prompt('enter book name:')
    if(!name) return
    const price = +prompt('enter book price:')
    if(!price) return
    const book = addeBook(name, price)
    gBooks.push(book)
    saveBooksToStorage()
}

function updateBook(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    const newPrice = +prompt('Enter new price', book.price)
    if (newPrice === book.price) return
    book.price = newPrice
    saveBooksToStorage()

}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    saveBooksToStorage()
}
function findBook(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function changeRate(num, bookId) {
    const book = gBooks.find(book => bookId === book.id)
    book.rate = num
    saveBooksToStorage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
}

function saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _makeId(length = 3) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}