let searchButton = document.querySelector('.fa-search');
let searchForm =  document.querySelector('.search-form');
let cardToggle = document.querySelector('.cart-container-toggle');
let cardButton = document.querySelector('.fa-shopping-cart');

searchButton.addEventListener('click', () => {
    cardToggle.classList.remove('active');
    searchForm.classList.toggle('active');
})

cardButton.addEventListener( 'click', () => {
    searchForm.classList.remove('active');
    cardToggle.classList.toggle('active');
})


//================================================================================================================// удаление элементов со страницы корзины
                                                                                                                  // по нажатии на кнопку, и обработчик на      
let cardItems = document.querySelector('.card-items');                                                             // клиенте  

if (cardItems) {
    cardItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteButtonCard')) {
            let id = event.target.dataset.id;
            
            
            fetch('/myCard/delete/' + id, {
                method: 'delete'
            }).then(res => res.json())
            .then(cardObj => {

                if (cardObj.length){
                
                    let HTMLText = cardObj.map( order => {
                        if (order.type){

                            return `<div class="cart-item">
                            <button data-id="${order._id}" class="deleteButtonCard fas fa-times"></button>      
                            <img src="${order.image}" alt="">
                            <div class="content">
                                <h3>${order.type}</h3>
                                <div class="price">$ ${order.price}</div>
                            </div>
                            <div class="card-item_amount">
                            ${order.amount}
                            </div>
                            </div>`
                        }
                    });

                    HTMLText = HTMLText.join('');

                    cardItems.innerHTML = HTMLText;

                    let price = document.querySelector('.totalPrice');
                    
                    let totalprice = 0;

                    cardObj.forEach( (item) => {

                        let amount = item.amount;
                                                                                                               //вычесляем сумму цен на все продукты      
                        totalprice = (Number(totalprice) + ( Number(item.price) * Number(amount)));
                        totalprice = Number(totalprice).toFixed(2);

                    })
                    
                    price.innerText = `Total Price: ${totalprice} $`;

                } else {

                    let titleMessage = document.createElement('H1');
                    titleMessage.innerText = 'Your card is still empty. Don\'t loose your chance today and order now our tasty and powerful coffee which wiil wake you up, even if you are dead';
                    titleMessage.className = 'title-messagee';
                    let cardSection = document.querySelector('.card');
                    cardSection.innerHTML = '';
                    cardSection.append(titleMessage);   
                }
            })
        }
    })
}

//========================================================================================================================//
//  форматированние даты на странице orders
//========================================================================================================================//

const toDate = date => {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'  
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent);
})