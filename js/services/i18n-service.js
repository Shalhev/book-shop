var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'add-book': {
        en: 'Add new book',
        he: 'הוסף ספר חדש'
    },
    'sort-by': {
        en: 'Sort by:',
        he: 'מיין לפי:'
    },
    'titleAZ': {
        en: 'Title A-Z',
        he: 'כותרת א-ת'
    },
    'titleZA': {
        en: 'Title Z-A',
        he: 'כותרת ת-א'
    },
    'price-low-to-high': {
        en: 'Price: high to low',
        he: 'מחיר: מהגובה לנמוך'

    },
    'price-high-to-low': {
        en: 'Price: low to high',
        he: 'מחיר: מהנמוך לגבוה'
    },
    'rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'minimum-rate': {
        en: 'Minimum Rate:',
        he: 'דירוג מינימלי:'
    },
    'max-price': {
        en: 'Max Price::',
        he: 'מחיר מקסימלי:'
    },
    'search': {
        en: 'Search...',
        he: 'חפש...'
    },
    'book-id': {
        en: 'ID',
        he: 'איידי'
    },
    'book-title': {
        en: 'Title',
        he: 'כותרת'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-book': {
        en: 'Read',
        he: 'קריאה'
    },
    'update-book': {
        en: 'Update',
        he: 'עדכון'
    },
    'delete-book': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'back-page': {
        en: 'Back Page',
        he: 'עמוד קודם'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";

    var txt = keyTrans[gCurrLang] // he
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.localName === "input") {
            el.setAttribute("placeholder", txt)
            // el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang; // he
}