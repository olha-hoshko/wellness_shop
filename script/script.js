const productsList = {
    item0: {
        sale: true,
        img: `item0-img`,
        btn: `item0-btn`,
        name: `Star Anise & Lily`,
        price: `$38.00`,
        salePrice: `$40.00`
    },
    item1: {
        sale: true,
        img: `item1-img`,
        btn: `item1-btn`,
        name: `Lavender`,
        price: `$80.75`,
        salePrice: `$85.00`
    },
    item2: {
        sale: false,
        img: `item2-img`,
        btn: `item2-btn`,
        name: `Pearl Powder`,
        price: `$85.00`,
        salePrice: `none`
    },
    item3: {
        sale: true,
        img: `item3-img`,
        btn: `item3-btn`,
        name: `Coco & Sandelwoo`,
        price: `$14.25`,
        salePrice: `$15.00`
    },
    item4: {
        sale: true,
        img: `item4-img`,
        btn: `item4-btn`,
        name: `Aromatic Blend`,
        price: `$9.50`,
        salePrice: `$10.00`
    },
    item5: {
        sale: true,
        img: `item5-img`,
        btn: `item5-btn`,
        name: `Three Rose`,
        price: `$19.00`,
        salePrice: `$20.00`
    },
    item6: {
        sale: false,
        img: `item6-img`,
        btn: `item6-btn`,
        name: `Green Clay`,
        price: `$85.00`,
        salePrice: `none`
    },
    item7: {
        sale: true,
        img: `item7-img`,
        btn: `item7-btn`,
        name: `Organic Beeswax`,
        price: `$7.13`,
        salePrice: `$7.50`
    }
};

function createSlide(product, info) {
    let productContainer = document.createElement(`div`);
    productContainer.classList.add(`item-block`);
    productContainer.classList.add(`${product}`);

    if (info[`sale`] === true) {
        let saleDiv = document.createElement(`div`);
        saleDiv.classList.add(`sale`);
        saleDiv.classList.add(`font-normal`);
        saleDiv.innerText = `SALE`;
        productContainer.append(saleDiv);
    }

    let imgDiv = document.createElement(`div`);
    imgDiv.classList.add(`product-img`);
    imgDiv.classList.add(`${info[`img`]}`);

    let imgBtn = document.createElement(`button`);
    imgBtn.classList.add(`product-view-button`);
    imgBtn.classList.add(`font-normal`);
    imgBtn.classList.add(`${info[`btn`]}`);
    imgBtn.innerText = `Quick View`;

    imgDiv.append(imgBtn);
    productContainer.append(imgDiv);

    let infoDiv = document.createElement(`div`);
    infoDiv.classList.add(`product-info`);

    let nameSpan = document.createElement(`span`);
    nameSpan.classList.add(`product-name`);
    nameSpan.classList.add(`font-normal`);
    nameSpan.innerText = info[`name`];

    infoDiv.append(nameSpan);

    let priceDiv = document.createElement(`div`);
    priceDiv.classList.add(`product-price`);

    if (info[`salePrice`] !== `none`) {
        let salePriceSpan = document.createElement(`span`);
        salePriceSpan.classList.add(`price-before-sale`);
        salePriceSpan.classList.add(`font-normal`);
        salePriceSpan.innerText = info[`salePrice`];
        priceDiv.append(salePriceSpan);
    }

    let priceSpan = document.createElement(`span`);
    priceSpan.classList.add(`font-normal`);
    priceSpan.innerText = info[`price`];
    priceDiv.append(priceSpan);

    infoDiv.append(priceDiv);
    productContainer.append(infoDiv);
    return productContainer;
}

function createProductsSlides(product) {
    return createSlide(product, productsList[product]);
}

document.addEventListener(`DOMContentLoaded`, () => {
    const slider = document.querySelector(`.all-items`);

    function appendItems() {
        for(let i = 0; i < 6; i++) {
            let productName = `item${i}`;
            const productHTML = createProductsSlides(productName);
            slider.append(productHTML);
        }
    }

    appendItems();

    const slides = document.querySelectorAll(`.item-block`);
    const maxAmount = 8;
    let currentSlide = 0;

    const itemAmount = slides.length; //6
    const itemWidth = 100 * (slider.clientWidth / itemAmount) / window.innerWidth;
    let itemPosition = -itemWidth;

    function slide() {
        slider.style.transition = `all 0.7s ease`;
        slider.style.transform = `translateX(${itemPosition}vw)`;
    }

    function changePosition() {
        slider.style.transition = `none`;
        slider.style.transform = `translateX(${itemPosition}vw)`;
    }

    const nextButton = document.getElementById(`item-next-button`);
    nextButton.addEventListener(`click`, () => {
        nextButton.disabled = true;
        itemPosition -= itemWidth;
        slide();
        setTimeout(() => {
            for (let i = 0; i < itemAmount; i++) {
                slides[i].classList.remove(`item${(i + currentSlide) % (maxAmount)}`);
                slides[i].classList.add(`item${(i + currentSlide + 1) % (maxAmount)}`);
                const productName = `item${(i + currentSlide + 1) % (maxAmount)}`;
                const productHTML = createProductsSlides(productName);
                slides[i].innerHTML = productHTML.innerHTML;
            };
            itemPosition += itemWidth;
            changePosition();
            currentSlide++;
            if (currentSlide === maxAmount) currentSlide = 0;
            nextButton.disabled = false;
        }, 700);
    });

    const previousButton = document.getElementById(`item-previous-button`);
    previousButton.addEventListener(`click`, () => {
        itemPosition += itemWidth;
        slide();
        previousButton.disabled = true;
        setTimeout(() => {
            if (currentSlide === 0) currentSlide = maxAmount;
            for (let i = 0; i < itemAmount; i++) {
                slides[i].classList.remove(`item${(i + currentSlide) % (maxAmount)}`);
                slides[i].classList.add(`item${(i + currentSlide - 1) % (maxAmount)}`);
                const productName = `item${(i + currentSlide - 1) % (maxAmount)}`;
                const productHTML = createProductsSlides(productName);
                slides[i].innerHTML = productHTML.innerHTML;
            };
            itemPosition -= itemWidth;
            changePosition();
            currentSlide--;
            previousButton.disabled = false;
        }, 700);
    });

});