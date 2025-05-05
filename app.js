document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const header = document.querySelector('header');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productosGrid = document.querySelector('.productos-grid');
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const modal = document.getElementById('producto-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    const cargarMasBtn = document.getElementById('cargar-mas');
    
    // Carrito de compras - Funcionalidad completa
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.querySelector('.cart-count');

// Abrir carrito
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    actualizarCarrito();
});
// Cerrar carrito
function cerrarCarrito() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartClose.addEventListener('click', cerrarCarrito);
cartOverlay.addEventListener('click', cerrarCarrito);

// Actualizar carrito
function actualizarCarrito() {
    cartItems.innerHTML = '';
    let total = 0;
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartCount.textContent = '0';
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    
    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="cart-item-details">
                <h4>${item.nombre}</h4>
                <div class="cart-item-price">Gs.${item.precio.toFixed(3)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn cart-decrement" data-id="${item.id}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="quantity-btn cart-increment" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar contador y total
    cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartTotalPrice.textContent = `Gs.${total.toFixed(3)}`;
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.cart-decrement').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            decrementarCantidad(id);
        });
    });
    
    document.querySelectorAll('.cart-increment').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            incrementarCantidad(id);
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            eliminarDelCarrito(id);
        });
    });
}

// Incrementar cantidad
function incrementarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item && item.cantidad < 10) {
        item.cantidad++;
        actualizarCarrito();
    }
}

// Decrementar cantidad
function decrementarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad--;
        actualizarCarrito();
    }
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Finalizar compra
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Aquí puedes implementar la lógica para finalizar la compra
    // Por ejemplo, redirigir a una página de checkout o mostrar un formulario
    
    // Simulación de finalización de compra
    alert('¡Gracias por tu compra! Total: $' + cartTotalPrice.textContent.slice(1));
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
});

// Añadir estilos para el carrito
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-sidebar {
        position: fixed;
        top: 0;
        right: -400px;
        width: 350px;
        max-width: 90vw;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .cart-sidebar.active {
        right: 0;
    }
    
    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
    }
    
    .cart-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .cart-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .cart-close {
        cursor: pointer;
        font-size: 1.2rem;
    }
    
    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    }
    
    .empty-cart {
        text-align: center;
        padding: 30px 0;
        color: #888;
    }
    
    .cart-item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        position: relative;
    }
    
    .cart-item-img {
        width: 80px;
        height: 80px;
        margin-right: 15px;
    }
    
    .cart-item-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        margin: 0 0 5px;
        font-size: 1rem;
    }
    
    .cart-item-price {
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
    }
    
    .quantity-btn {
        width: 25px;
        height: 25px;
        background-color: #f0f0f0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .cart-item-quantity span {
        margin: 0 10px;
    }
    
    .cart-item-remove {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
    }
    
    .cart-footer {
        padding: 20px;
        border-top: 1px solid #eee;
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        margin-bottom: 15px;
        font-size: 1.1rem;
    }
    
    .checkout-btn {
        width: 100%;
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: var(--primary-color);
        color: white;
        font-size: 0.7rem;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .cart-icon {
        position: relative;
        cursor: pointer;
    }
`;
document.head.appendChild(cartStyles);

    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Data de productos (Simulación de API)
    const productos = [
        {
            id: 1,
            nombre: 'Cartera de Mano',
            categoria: 'De Mano',
            precio: 120.000,
            imagen: '/IMG/DeMano/demano3.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            nombre: 'Porta Notebook',
            categoria: 'De Mano',
            precio: 99.000,
            imagen: '/IMG/DeMano/demano2.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 3,
            nombre: 'Cartera Monocromatica',
            categoria: 'De Hombro',
            precio: 235.000,
            imagen: '/IMG/DeHombro/bolso de trapillo a crochet.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 4,
            nombre: 'Cartera con perlas',
            categoria: 'De Hombro',
            precio: 190.000,
            imagen: '/IMG/DeHombro/img2.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 5,
            nombre: 'Porta Auricular',
            categoria: 'NewCollection',
            precio: 50.000,
            imagen: '/IMG/Extras/extra2.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 6,
            nombre: 'Porta Celular',
            categoria: 'NewCollection',
            precio: 80.000,
            imagen: '/IMG/Extras/extra.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 7,
            nombre: 'Cartera Negra',
            categoria: 'De Mano',
            precio: 109.000,
            imagen: '/IMG/DeMano/demano.jpeg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 8,
            nombre: 'Cartera Multicolor',
            categoria: 'De Hombro',
            precio: 119.000,
            imagen: '/IMG/yose.jpg',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];
    
    // Productos destacados
    const productosDestacados = [
        productos[0],
        productos[2],
        productos[4]
    ];
    
    // Función para crear tarjeta de producto
    function crearProductoCard(producto) {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.dataset.categoria = producto.categoria;
        
        const cardContent = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <div class="producto-categoria">${producto.categoria}</div>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <div class="producto-precio">Gs.${producto.precio.toFixed(3)}</div>
                <div class="producto-action">
                    <button class="btn-detalles" data-id="${producto.id}">Detalles</button>
                    <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;
        
        card.innerHTML = cardContent;
        
        // Añadir event listeners después de crear el contenido
        const detallesBtn = card.querySelector('.btn-detalles');
        const agregarBtn = card.querySelector('.btn-agregar');
        
        detallesBtn.addEventListener('click', () => {
            abrirModal(producto);
        });
        
        agregarBtn.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
        
        return card;
    }
    
    // Filtros de productos
    let isScrolling = false;

    function actualizarProductos(filtro) {
        // Limpiar el grid
        productosGrid.innerHTML = '';
        
        // Filtrar y mostrar productos
        const productosFiltrados = filtro === 'todos' 
            ? productos 
            : productos.filter(p => p.categoria === filtro);
            
        productosFiltrados.forEach(producto => {
            const card = crearProductoCard(producto);
            productosGrid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar clase activa
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar productos inmediatamente
            const filtro = btn.dataset.filter;
            actualizarProductos(filtro);
            
            // Scroll opcional
            if (!isScrolling) {
                const catalogoSection = document.getElementById('catalogo');
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = catalogoSection.offsetTop - headerHeight;
                
                isScrolling = true;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });

    // Cargar productos iniciales
    function cargarProductos(productos, filtro = 'todos') {
        actualizarProductos(filtro);
    }
    
    // Cargar productos destacados en el carousel
    function cargarProductosDestacados() {
        carouselTrack.innerHTML = '';
        
        productosDestacados.forEach(producto => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.appendChild(crearProductoCard(producto));
            carouselTrack.appendChild(slide);
        });
    }
    
    // Modal de producto
    function abrirModal(producto) {
        modalBody.innerHTML = `
            <div class="modal-producto">
                <div class="modal-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="modal-info">
                    <div class="modal-categoria">${producto.categoria}</div>
                    <h2 class="modal-nombre">${producto.nombre}</h2>
                    <div class="modal-precio">Gs.${producto.precio.toFixed(3)}</div>
                    <p class="modal-descripcion">${producto.descripcion}</p>
                    <div class="modal-cantidad">
                        <span>Cantidad:</span>
                        <div class="cantidad-control">
                            <button class="cantidad-btn decremento">-</button>
                            <input type="number" class="cantidad-input" value="1" min="1" max="10">
                            <button class="cantidad-btn incremento">+</button>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary agregar-carrito-modal" data-id="${producto.id}">Agregar al Carrito</button>
                        <button class="btn-secondary">Comprar Ahora</button>
                    </div>
                </div>
            </div>
        `;;
        
        // Event listeners para controles de cantidad
        const decrementoBtn = modalBody.querySelector('.decremento');
        const incrementoBtn = modalBody.querySelector('.incremento');
        const cantidadInput = modalBody.querySelector('.cantidad-input');
        
        decrementoBtn.addEventListener('click', () => {
            let cantidad = parseInt(cantidadInput.value);
            if (cantidad > 1) {
                cantidadInput.value = cantidad - 1;
            }
        });
        
        incrementoBtn.addEventListener('click', () => {
            let cantidad = parseInt(cantidadInput.value);
            if (cantidad < 10) {
                cantidadInput.value = cantidad + 1;
            }
        });
        
        // Event listener para agregar al carrito desde modal
        const agregarCarritoBtn = modalBody.querySelector('.agregar-carrito-modal');
        agregarCarritoBtn.addEventListener('click', () => {
            const cantidad = parseInt(cantidadInput.value);
            agregarAlCarrito(producto, cantidad);
            cerrarModal();
        });
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    

    const modalResponsiveStyles = document.createElement('style');
    modalResponsiveStyles.textContent = `
        /* Estilos base del modal */
        .producto-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .producto-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            width: 90%;
            max-width: 1000px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10;
            color: #333;
        }
        
        /* Nuevo layout responsive para el modal */
        .modal-producto {
            display: flex;
            flex-direction: row;
            padding: 20px;
        }
        
        .modal-img {
            flex: 1;
            padding-right: 20px;
        }
        
        .modal-img img {
            width: 100%;
            height: auto;
            border-radius: var(--border-radius);
            object-fit: cover;
        }
        
        .modal-info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .modal-categoria {
            text-transform: uppercase;
            font-size: 0.8rem;
            color: var(--primary-color);
            margin-bottom: 5px;
        }
        
        .modal-nombre {
            font-size: 1.8rem;
            margin: 0 0 10px;
        }
        
        .modal-precio {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 15px;
        }
        
        .modal-descripcion {
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .modal-cantidad {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .cantidad-control {
            display: flex;
            align-items: center;
            margin-left: 10px;
        }
        
        .cantidad-btn {
            width: 30px;
            height: 30px;
            background-color: #f0f0f0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.2rem;
        }
        
        .cantidad-input {
            width: 40px;
            height: 30px;
            text-align: center;
            margin: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
        }
        
        /* Media queries para hacer el modal responsive */
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-producto {
                flex-direction: column;
                padding: 15px;
            }
            
            .modal-img {
                padding-right: 0;
                padding-bottom: 15px;
            }
            
            .modal-img img {
                max-height: 250px;
                width: 100%;
                object-fit: contain;
            }
            
            .modal-nombre {
                font-size: 1.5rem;
            }
            
            .modal-precio {
                font-size: 1.3rem;
            }
            
            .modal-actions {
                flex-direction: column;
            }
            
            .modal-actions button {
                width: 100%;
            }
        }
        
        /* Para pantallas muy pequeñas */
        @media (max-width: 480px) {
            .modal-content {
                width: 100%;
                height: 100%;
                max-height: 100vh;
                border-radius: 0;
                display: flex;
                flex-direction: column;
            }
            
            .modal-close {
                top: 10px;
                right: 10px;
                font-size: 1.2rem;
            }
            
            .modal-body {
                flex: 1;
                overflow-y: auto;
                padding-bottom: 20px;
            }
            
            .modal-img img {
                max-height: 200px;
            }
            
            .modal-nombre {
                font-size: 1.3rem;
            }
            
            .modal-precio {
                font-size: 1.2rem;
            }
            
            .cantidad-btn, .cantidad-input {
                height: 36px;
            }
            
            .cantidad-btn {
                width: 36px;
            }
        }
    `;    

    function cerrarModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Carrito de compras (simulación)
    let carrito = [];
    
    function agregarAlCarrito(producto, cantidad = 1) {
        // Buscar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.id === producto.id);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carrito.push({
                ...producto,
                cantidad: cantidad
            });
        }
        
        // Actualizar el contador del carrito inmediatamente
        actualizarCarrito();
        
        // Mostrar notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = `¡${producto.nombre} agregado al carrito!`;
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('active');
            setTimeout(() => {
                notificacion.classList.remove('active');
                setTimeout(() => {
                    notificacion.remove();
                }, 300);
            }, 2000);
        }, 10);
        
        console.log('Carrito actualizado:', carrito);
    }
    
    // Carousel controls
    let slideIndex = 0;
    const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
    
    function actualizarCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${slideIndex * (slideWidth + 20)}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (slideIndex > 0) {
            slideIndex--;
            actualizarCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slideIndex < slides.length - slidesToShow) {
            slideIndex++;
            actualizarCarousel();
        }
    });
    
    // Responsive carousel
    window.addEventListener('resize', () => {
        slideIndex = 0;
        setTimeout(actualizarCarousel, 100);
    });
    
    // Botón cargar más
    cargarMasBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simular carga de más productos
        setTimeout(() => {
            // Aquí podrías hacer una llamada a una API para cargar más productos
            // Para esta demostración, simplemente mostramos los mismos productos de nuevo
            cargarProductos(productos, document.querySelector('.filter-btn.active').dataset.filter);
            
            // Cambiar texto del botón para indicar que no hay más productos
            cargarMasBtn.textContent = 'No hay más productos';
            cargarMasBtn.disabled = true;
        }, 1000);
    });
    
    // Formulario de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            // Simular envío de formulario
            console.log('Suscripción newsletter:', email);
            
            // Mostrar mensaje de éxito
            newsletterForm.innerHTML = '<p class="success-message">¡Gracias por suscribirte! Recibirás nuestras novedades pronto.</p>';
        });
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                nombre: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                asunto: contactForm.querySelectorAll('input[type="text"]')[1].value,
                mensaje: contactForm.querySelector('textarea').value
            };
            
            // Simular envío de formulario
            console.log('Formulario de contacto:', formData);
            
            // Mostrar mensaje de éxito
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '¡Mensaje Enviado!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Nav activo según posición de scroll
    function actualizarNavActivo() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', actualizarNavActivo);
    
    // Animación de revelado al hacer scroll
    function revelarElementos() {
        const elements = document.querySelectorAll('.section-header, .producto-card, .nosotros-container, .contacto-container');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Añadir clase para CSS
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .producto-card, .nosotros-container, .contacto-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .section-header.active, .producto-card.active, .nosotros-container.active, .contacto-container.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notificacion {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1500;
        }
        
        .notificacion.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .success-message {
            color: white;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    document.head.appendChild(modalResponsiveStyles);
    
    window.addEventListener('scroll', revelarElementos);
    
    // Inicialización
    cargarProductos(productos);
    cargarProductosDestacados();
    actualizarCarousel();
    actualizarNavActivo();
    revelarElementos();
    actualizarCarrito();

    // Search Functionality
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    searchInput.addEventListener('focus', () => {
        searchBar.style.boxShadow = '0 0 0 2px var(--primary-color)';
    });

    searchInput.addEventListener('blur', () => {
        searchBar.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        // Implement search functionality here
        console.log('Searching for:', e.target.value);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});