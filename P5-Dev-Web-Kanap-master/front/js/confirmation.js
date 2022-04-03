let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

const userOrderId = document.querySelector('#orderId');
userOrderId.textContent = productId;

localStorage.removeItem('userProducts');