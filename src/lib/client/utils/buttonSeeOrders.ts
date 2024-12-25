const disabledButton = (showSeeOrders:boolean) =>{
    const cartElement = document.getElementById('cart');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showSeeOrders = false;
        } else {
          showSeeOrders = true;
        }
      });
    });
    
    if (cartElement) {
      observer.observe(cartElement);
    }
}