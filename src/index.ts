const baseUrl = 'https://anyway-grapes';

/**
 * Show the specified status icon on the specified element
 *
 * @param Element element
 * @param string icon
 */
function showStatusIcon(element: Element, icon: string) {
    const iconUrl = `${baseUrl}/wholesale/${icon}`;
    element.innerHTML = `<img src="${iconUrl}" class="add-to-cart-img">`;
}

/**
 * Build parameter for POST request
 *
 * @param string productId
 * @return URLSearchParams Parameter for POST request
 */
function buildPostParam(productId: string): URLSearchParams {
    const param = new URLSearchParams();
    param.append('action', 'add');
    param.append('cart_type', '2');
    param.append('pid', productId);
    param.append('qty', '1');

    return param;
}

// Send POST request for adding the selected product to cart
document.addEventListener('DOMContentLoaded', (): void => {
    const addToCartLink = document.querySelector('a.link--action-addtocart');
    addToCartLink.addEventListener('click', (event) => {
        const parentTd = addToCartLink.closest('td');
        showStatusIcon(parentTd, 'load_ajax_post.gif');

        // Show loading icon and send POST request for adding an item to cart
        fetch(`${baseUrl}/cart.php`, {
            body: buildPostParam(addToCartLink.id),
            credentials: 'include',
            method: 'POST',
        })
        .then((data) => {
            showStatusIcon(parentTd, 'success.png');
        });

        return false;
    });
});
