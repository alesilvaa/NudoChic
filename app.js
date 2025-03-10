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
    
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
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
            nombre: 'Producto 1',
            categoria: 'categoria1',
            precio: 59.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            nombre: 'Producto 2',
            categoria: 'categoria1',
            precio: 49.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 3,
            nombre: 'Producto 3',
            categoria: 'categoria2',
            precio: 69.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 4,
            nombre: 'Producto 4',
            categoria: 'categoria2',
            precio: 79.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 5,
            nombre: 'Producto 5',
            categoria: 'categoria3',
            precio: 89.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 6,
            nombre: 'Producto 6',
            categoria: 'categoria3',
            precio: 99.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 7,
            nombre: 'Producto 7',
            categoria: 'categoria1',
            precio: 109.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 8,
            nombre: 'Producto 8',
            categoria: 'categoria2',
            precio: 119.99,
            imagen: '/api/placeholder/400/400',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];
    
    // Productos destacados
    const productosDestacados = [
        productos[0],
        productos[2],
        productos[4],
        productos[5],
        productos[7]
    ];
    
    // Función para crear tarjeta de producto
    function crearProductoCard(producto) {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.dataset.categoria = producto.categoria;
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <div class="producto-categoria">${producto.categoria}</div>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                <div class="producto-action">
                    <button class="btn-detalles" data-id="${producto.id}">Detalles</button>
                    <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;
        
        // Event listener para botón de detalles
        card.querySelector('.btn-detalles').addEventListener('click', () => {
            abrirModal(producto);
        });
        
        // Event listener para botón de agregar
        card.querySelector('.btn-agregar').addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
        
        return card;
    }
    
    // Cargar productos iniciales
    function cargarProductos(productos, filtro = 'todos') {
        productosGrid.innerHTML = '';
        
        productos.forEach(producto => {
            if (filtro === 'todos' || producto.categoria === filtro) {
                productosGrid.appendChild(crearProductoCard(producto));
            }
        });
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
    
    // Filtros de productos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar clase activa
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar productos
            const filtro = btn.dataset.filter;
            cargarProductos(productos, filtro);
        });
    });
    
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
                    <div class="modal-precio">$${producto.precio.toFixed(2)}</div>
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
        `;
        
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
        
        // Mostrar notificación (puedes implementar una mejor UI para esto)
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
    
    window.addEventListener('scroll', revelarElementos);
    
    // Inicialización
    cargarProductos(productos);
    cargarProductosDestacados();
    actualizarCarousel();
    actualizarNavActivo();
    revelarElementos();
});