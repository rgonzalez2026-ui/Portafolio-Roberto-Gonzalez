(function(){
  "use strict";

  var WHATSAPP_NUMBER = "56912345678"; // reemplazar por el número real del negocio

  var ICONS = {
    base: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h16"/><path d="M5 12a7 7 0 0 0 14 0"/><path d="M12 12V4M9 6l3-2 3 2"/></svg>',
    mar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s3.5-5 8-5 8 5 8 5-3.5 5-8 5-8-5-8-5Z"/><circle cx="8.5" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M18 12l4-3v6l-4-3Z"/></svg>',
    salsas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6M10 3v4l-3.5 5.5A3 3 0 0 0 9 17h6a3 3 0 0 0 2.5-4.5L14 7V3"/><path d="M7.5 14h9"/></svg>',
    utensilios: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="4" rx="1"/><rect x="3" y="11" width="18" height="4" rx="1"/><rect x="3" y="17" width="10" height="3" rx="1"/></svg>',
    kits: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h18v13H3z"/><path d="M3 8l9-5 9 5M12 8v13M3 8l9 5 9-5"/></svg>'
  };

  var CATEGORIES = [
    { id:"todos", label:"Todos" },
    { id:"base", label:"Arroz y Algas" },
    { id:"mar", label:"Pescados y Mariscos" },
    { id:"salsas", label:"Salsas y Condimentos" },
    { id:"utensilios", label:"Utensilios" },
    { id:"kits", label:"Kits" }
  ];

  var PRODUCTS = [
    { id:1, name:"Arroz para sushi grano corto 1kg", cat:"base", price:4990, desc:"Grano corto japonés, ideal para un buen punto de cocción.", badge:"Más pedido" },
    { id:2, name:"Arroz para sushi grano corto 5kg", cat:"base", price:18990, desc:"Formato familiar o para uso frecuente en barra." },
    { id:3, name:"Alga nori tostada x50 láminas", cat:"base", price:8990, desc:"Tostado parejo, ideal para maki y temaki." },
    { id:4, name:"Alga nori orgánica x25 láminas", cat:"base", price:6990, desc:"Cultivo orgánico certificado, sabor más suave." },
    { id:5, name:"Vinagre de arroz 500ml", cat:"base", price:3490, desc:"Base esencial para sazonar el arroz de sushi." },
    { id:6, name:"Salmón fresco porción sushi 500g", cat:"mar", price:9990, desc:"Corte grado sushi, cadena de frío garantizada.", badge:"Más pedido" },
    { id:7, name:"Atún grado sushi 500g", cat:"mar", price:12990, desc:"Ideal para nigiri y sashimi.", badge:"Más pedido" },
    { id:8, name:"Camarón cocido pelado 500g", cat:"mar", price:6490, desc:"Listo para usar en rolls y ensaladas." },
    { id:9, name:"Kanikama (surimi) 400g", cat:"mar", price:4290, desc:"Clásico para el California roll." },
    { id:10, name:"Palta Hass (unidad)", cat:"mar", price:1490, desc:"Selección madura, lista para el día del corte." },
    { id:11, name:"Salsa de soja 500ml", cat:"salsas", price:3990, desc:"Fermentación tradicional, sabor equilibrado." },
    { id:12, name:"Wasabi en pasta 43g", cat:"salsas", price:2990, desc:"Picor parejo, listo para servir.", badge:"Más pedido" },
    { id:13, name:"Jengibre encurtido 200g", cat:"salsas", price:2790, desc:"Gari clásico para limpiar el paladar." },
    { id:14, name:"Salsa anguila (unagi) 300ml", cat:"salsas", price:4590, desc:"Dulce y espesa, perfecta para pincelar rolls." },
    { id:15, name:"Furikake mix sésamo 100g", cat:"salsas", price:3290, desc:"Condimento crocante para terminar tus platos." },
    { id:16, name:"Esterilla de bambú para enrollar", cat:"utensilios", price:2990, desc:"Makisu tradicional, tamaño estándar.", badge:"Más pedido" },
    { id:17, name:"Set de cuchillos para sushi (3 pzs)", cat:"utensilios", price:24990, desc:"Filo japonés para cortes limpios." },
    { id:18, name:"Hangiri — bandeja de madera 27cm", cat:"utensilios", price:34990, desc:"Bandeja tradicional para airear el arroz." },
    { id:19, name:"Molde para nigiri x6", cat:"utensilios", price:7990, desc:"Formas parejas sin necesitar experiencia previa." },
    { id:20, name:"Kit iniciación sushi en casa (4 personas)", cat:"kits", price:19990, desc:"Arroz, nori, vinagre, esterilla y salsa de soja.", badge:"Más pedido" },
    { id:21, name:"Kit sushi vegetariano", cat:"kits", price:14990, desc:"Palta, pepino, zanahoria en conserva, nori y arroz." }
  ];

  var state = {
    category: "todos",
    search: "",
    cart: {} // id -> qty
  };

  var fmt = new Intl.NumberFormat('es-CL', { style:'currency', currency:'CLP', maximumFractionDigits:0 });
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function productById(id){ return PRODUCTS.find(function(p){ return p.id === id; }); }

  /* ---------- render pills ---------- */
  var pillRow = document.getElementById('pillRow');
  CATEGORIES.forEach(function(c){
    var b = document.createElement('button');
    b.className = 'pill' + (c.id === state.category ? ' active' : '');
    b.textContent = c.label;
    b.dataset.cat = c.id;
    b.addEventListener('click', function(){
      state.category = c.id;
      document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
      b.classList.add('active');
      renderProducts();
    });
    pillRow.appendChild(b);
  });

  /* ---------- search ---------- */
  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function(){
    state.search = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  /* ---------- product card markup ---------- */
  function cardHTML(p){
    var icon = ICONS[p.cat] || ICONS.base;
    var qty = state.cart[p.id] || 0;
    return (
      '<article class="card" data-id="' + p.id + '">' +
        '<div class="card-top">' +
          '<div class="card-icon">' + icon + '</div>' +
          (p.badge ? '<span class="badge">' + p.badge + '</span>' : '') +
        '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p class="desc">' + p.desc + '</p>' +
        '<div class="card-bottom">' +
          '<span class="price">' + fmt.format(p.price) + '</span>' +
          '<button class="add-btn" data-add="' + p.id + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
            (qty > 0 ? 'Agregado (' + qty + ')' : 'Agregar') +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  var grid = document.getElementById('productGrid');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
    });
  }, { threshold:0.12 });

  function renderProducts(){
    var list = PRODUCTS.filter(function(p){
      var matchCat = state.category === 'todos' || p.cat === state.category;
      var matchSearch = !state.search || p.name.toLowerCase().indexOf(state.search) !== -1;
      return matchCat && matchSearch;
    });

    if(list.length === 0){
      grid.innerHTML = '<div class="empty-msg">No encontramos productos con ese criterio. Prueba con otra búsqueda o categoría.</div>';
      return;
    }

    grid.innerHTML = list.map(cardHTML).join('');

    if(reduceMotion){
      grid.querySelectorAll('.card').forEach(function(el){ el.classList.add('in-view'); });
    } else {
      grid.querySelectorAll('.card').forEach(function(el){ revealObserver.observe(el); });
    }
  }

  /* ---------- belt (featured) ---------- */
  var beltTrack = document.getElementById('beltTrack');
  function renderBelt(){
    var featured = PRODUCTS.filter(function(p){ return p.badge; });
    var doubled = featured.concat(featured); // seamless loop
    beltTrack.innerHTML = doubled.map(function(p){
      var icon = ICONS[p.cat] || ICONS.base;
      return (
        '<div class="plate-card">' +
          '<span class="plate-badge">' + p.badge + '</span>' +
          '<div class="plate-icon">' + icon + '</div>' +
          '<h4>' + p.name + '</h4>' +
          '<span class="price">' + fmt.format(p.price) + '</span>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- cart logic ---------- */
  var cartCountEl = document.getElementById('cartCount');
  var drawerItemsEl = document.getElementById('drawerItems');
  var subtotalEl = document.getElementById('subtotalVal');
  var checkoutBtn = document.getElementById('checkoutBtn');

  function addToCart(id){
    state.cart[id] = (state.cart[id] || 0) + 1;
    syncCart();
  }
  function changeQty(id, delta){
    var q = (state.cart[id] || 0) + delta;
    if(q <= 0){ delete state.cart[id]; } else { state.cart[id] = q; }
    syncCart();
  }
  function removeFromCart(id){
    delete state.cart[id];
    syncCart();
  }

  function totalCount(){
    return Object.keys(state.cart).reduce(function(sum,id){ return sum + state.cart[id]; }, 0);
  }
  function totalPrice(){
    return Object.keys(state.cart).reduce(function(sum,id){
      var p = productById(Number(id));
      return sum + (p ? p.price * state.cart[id] : 0);
    }, 0);
  }

  function renderCart(){
    var ids = Object.keys(state.cart);
    cartCountEl.textContent = totalCount();

    if(ids.length === 0){
      drawerItemsEl.innerHTML = (
        '<div class="drawer-empty">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6"/></svg>' +
          '<p>Tu carrito está vacío.<br>Agrega productos desde el catálogo.</p>' +
        '</div>'
      );
      checkoutBtn.disabled = true;
    } else {
      drawerItemsEl.innerHTML = ids.map(function(id){
        var p = productById(Number(id));
        var qty = state.cart[id];
        var icon = ICONS[p.cat] || ICONS.base;
        return (
          '<div class="drawer-item">' +
            '<div class="di-icon">' + icon + '</div>' +
            '<div class="di-info">' +
              '<h5>' + p.name + '</h5>' +
              '<div class="qty-row">' +
                '<button class="qty-btn" data-dec="' + p.id + '">−</button>' +
                '<span class="qty-val">' + qty + '</span>' +
                '<button class="qty-btn" data-inc="' + p.id + '">+</button>' +
              '</div>' +
              '<button class="di-remove" data-remove="' + p.id + '">Quitar</button>' +
            '</div>' +
            '<span class="di-price">' + fmt.format(p.price * qty) + '</span>' +
          '</div>'
        );
      }).join('');
      checkoutBtn.disabled = false;
    }
    subtotalEl.textContent = fmt.format(totalPrice());
  }

  function syncCart(){
    renderCart();
    // Refresh "Agregado (n)" labels on visible product cards without a full re-render
    grid.querySelectorAll('.card').forEach(function(card){
      var id = Number(card.dataset.id);
      var qty = state.cart[id] || 0;
      var btn = card.querySelector('.add-btn');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
        (qty > 0 ? 'Agregado (' + qty + ')' : 'Agregar');
    });
  }

  grid.addEventListener('click', function(e){
    var addBtn = e.target.closest('[data-add]');
    if(addBtn){ addToCart(Number(addBtn.dataset.add)); }
  });

  drawerItemsEl.addEventListener('click', function(e){
    var inc = e.target.closest('[data-inc]');
    var dec = e.target.closest('[data-dec]');
    var rem = e.target.closest('[data-remove]');
    if(inc){ changeQty(Number(inc.dataset.inc), 1); }
    if(dec){ changeQty(Number(dec.dataset.dec), -1); }
    if(rem){ removeFromCart(Number(rem.dataset.remove)); }
  });

  /* ---------- drawer open/close ---------- */
  var overlay = document.getElementById('overlay');
  var drawer = document.getElementById('cartDrawer');
  function openDrawer(){
    overlay.classList.add('open');
    drawer.classList.add('open');
  }
  function closeDrawer(){
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }
  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeDrawer(); } });

  /* ---------- checkout via WhatsApp ---------- */
  function buildWhatsAppMessage(){
    var lines = ["Hola, quiero cotizar el siguiente pedido:"];
    Object.keys(state.cart).forEach(function(id){
      var p = productById(Number(id));
      var qty = state.cart[id];
      lines.push("• " + p.name + " x" + qty + " — " + fmt.format(p.price * qty));
    });
    lines.push("Total: " + fmt.format(totalPrice()));
    return lines.join("\n");
  }
  checkoutBtn.addEventListener('click', function(){
    if(checkoutBtn.disabled) return;
    var msg = encodeURIComponent(buildWhatsAppMessage());
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
  });

  /* ---------- floating WhatsApp ---------- */
  document.getElementById('waFloat').addEventListener('click', function(){
    var hasItems = Object.keys(state.cart).length > 0;
    var text = hasItems ? buildWhatsAppMessage() : "Hola, me gustaría cotizar insumos de sushi.";
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  });

  /* ---------- mobile menu ---------- */
  var navLinks = document.getElementById('navLinks');
  var menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); });
  });

  /* ---------- newsletter (visual only, in-memory) ---------- */
  document.getElementById('newsletterForm').addEventListener('submit', function(e){
    e.preventDefault();
    var input = document.getElementById('newsletterEmail');
    input.value = '';
    input.placeholder = '¡Gracias por suscribirte!';
  });

  /* ---------- init ---------- */
  renderBelt();
  renderProducts();
  renderCart();
})();
