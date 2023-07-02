/*      VINOTECA
        PREENTREGA 3
        FECHA ENTREGA: MIERCOLES 10/07/2023 23:59HS.
        MAXIMINO LEANDRO DANIEL
*/

//Declaración de constantes y variables
const bdProductos = [
    {
        codigo: "V01",
        nombre: "Omnium Malbec",
        categoria: "Vinos",
        precio: 814.00,
        url: "../img/V01.jpeg"
    },
    {
        codigo: "V02",
        nombre: "La Poderosa Malbec",
        categoria: "Vinos",
        precio: 1439.00,
        url: "../img/V02.jpeg"
    },
    {
        codigo: "V03",
        nombre: "Terra Malbec",
        categoria: "Vinos",
        precio: 1228.2,
        url: "../img/V03.jpeg"
    },
    {
        codigo: "V04",
        nombre: "Finca Magnolia Cabernet Sauvignon",
        categoria: "Vinos",
        precio: 1208.00,
        url: "../img/V04.jpeg"
    },
    {
        codigo: "V05",
        nombre: "Colomé Torrontés",
        categoria: "Vinos",
        precio: 2640.30,
        url: "../img/V05.jpeg"
    },
    {
        codigo: "V06",
        nombre: "Prófugo Especias Cabernet Sauvignon",
        categoria: "Vinos",
        precio: 852.00,
        url: "../img/V06.jpeg"
    },
    {
        codigo: "V07",
        nombre: "Los Helechos Chardonnay",
        categoria: "Vinos",
        precio: 4656.50,
        url: "../img/V07.jpeg"
    },
    {
        codigo: "V08",
        nombre: "Lagarde Malbec",
        categoria: "Vinos",
        precio: 2310.00,
        url: "../img/V08.jpeg"
    },
    {
        codigo: "V09",
        nombre: "Amalaya Blanco Blend",
        categoria: "Vinos",
        precio: 1320.00,
        url: "../img/V09.jpeg"
    },
    {
        codigo: "E01",
        nombre: "Alta Vista Brut Nature",
        categoria: "Espumantes",
        precio: 2380.00,
        url: "../img/E01.jpeg"
    },
    {
        codigo: "E02",
        nombre: "Navarro Correas Dolores Extra Brut",
        categoria: "Espumantes",
        precio: 1802.00,
        url: "../img/E02.jpeg"
    },
    {
        codigo: "E03",
        nombre: "Navarro Correas Extra Brut",
        categoria: "Espumantes",
        precio: 2400.20,
        url: "../img/E03.jpeg"
    },
    {
        codigo: "E04",
        nombre: "Nieto Senetiner Extra Brut",
        categoria: "Espumantes",
        precio: 3220.00,
        url: "../img/E04.jpeg"
    },
    {
        codigo: "E05",
        nombre: "Vive Sweet Sparkling",
        categoria: "Espumantes",
        precio: 1978.30,
        url: "../img/E05.jpeg"
    },
    {
        codigo: "E06",
        nombre: "Domaine Bousquet Brut Rosé",
        categoria: "Espumantes",
        precio: 3376.00,
        url: "../img/E06.jpeg"
    },
    {
        codigo: "E07",
        nombre: "Alamos Extra Brut",
        categoria: "Espumantes",
        precio: 2660.50,
        url: "../img/E07.jpeg"
    },
    {
        codigo: "E08",
        nombre: "Cruzat Premier Rosé Extra Brut",
        categoria: "Espumantes",
        precio: 3600.00,
        url: "../img/E08.jpeg"
    },
    {
        codigo: "E09",
        nombre: "Deseado Dulce Natural",
        categoria: "Espumantes",
        precio: 2850.00,
        url: "../img/E09.jpeg"
    },
    {
        codigo: "W01",
        nombre: "Old Parr De Luxe Whisky 750 ml",
        categoria: "Whisky",
        precio: 10470.00,
        url: "../img/W01.jpeg"
    },
    {
        codigo: "W02",
        nombre: "The Singleton 15 Años Whisky 700 ml",
        categoria: "Whisky",
        precio: 31830.00,
        url: "../img/W02.jpeg"
    },
    {
        codigo: "W03",
        nombre: "Glen Elgin 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 35487.00,
        url: "../img/W03.jpeg"
    },
    {
        codigo: "W04",
        nombre: "Jack Daniels Whisky 750 ml",
        categoria: "Whisky",
        precio: 15638.00,
        url: "../img/W04.jpeg"
    },
    {
        codigo: "W05",
        nombre: "White Horse Whisky 750 ml",
        categoria: "Whisky",
        precio: 3675.00,
        url: "../img/W05.jpeg"
    },
    {
        codigo: "W06",
        nombre: "Buchanans DeLuxe 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 15381.00,
        url: "../img/W06.jpeg"
    },
    {
        codigo: "W07",
        nombre: "Glenmorangie Whisky 700 ml",
        categoria: "Whisky",
        precio: 31650.00,
        url: "../img/W07.jpeg"
    },
    {
        codigo: "W08",
        nombre: "The Macallan Sherry Oak 12 Años Whisky 750 ml",
        categoria: "Whisky",
        precio: 101320.00,
        url: "../img/W08.jpeg"
    },
    {
        codigo: "W09",
        nombre: "Johnnie Walker Swing Whisky 750 ml",
        categoria: "Whisky",
        precio: 30369.00,
        url: "../img/W09.jpeg"
    },
    {
        codigo: "C01",
        nombre: "Clausthaler Cerveza sin alcohol 330 ml",
        categoria: "Cervezas",
        precio: 941.00,
        url: "../img/C01.jpeg"
    },
    {
        codigo: "C02",
        nombre: "Quilmes Cerveza sin alcohol Lata 473 ml",
        categoria: "Cervezas",
        precio: 470.00,
        url: "../img/C02.jpeg"
    },
    {
        codigo: "C03",
        nombre: "Patagonia Amber Lager Cerveza Lata 410 ml",
        categoria: "Cervezas",
        precio: 607.00,
        url: "../img/C03.jpeg"
    },
    {
        codigo: "C04",
        nombre: "Beagle Cream Stout Cerveza 330 ml",
        categoria: "Cervezas",
        precio: 720.00,
        url: "../img/C04.jpeg"
    },
    {
        codigo: "C05",
        nombre: "Schofferhofer Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 1232.00,
        url: "../img/C05.jpeg"
    },
    {
        codigo: "C06",
        nombre: "Estrella Damm Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 933.00,
        url: "../img/C06.jpeg"
    },
    {
        codigo: "C07",
        nombre: "Kaiserdom Kellerbier Cerveza Lata 1000 ml",
        categoria: "Cervezas",
        precio: 2896.00,
        url: "../img/C07.jpeg"
    },
    {
        codigo: "C08",
        nombre: "Kunstmann Session IPA Cerveza Lata 470 ml",
        categoria: "Cervezas",
        precio: 924.00,
        url: "../img/C08.jpeg"
    },
    {
        codigo: "C09",
        nombre: "Dab Cerveza Lata 500 ml",
        categoria: "Cervezas",
        precio: 1232.00,
        url: "../img/C09.jpeg"
    }
];

/* Definir Variables y Constantes */
const seccionProductos = document.getElementById("productos");
const seccionFiltros = document.getElementById("filtros");
const buscarProducto = document.querySelector("#buscar");
const textoABuscar = document.querySelector("#texto-filtro");
const tipoFiltro = document.querySelector("#tipo-filtro");
const totalProductos = [...bdProductos];


/* Declarar funciones */
const cargarProductos = (productos) => {
    borrarArticulos();
    if(productos.length === 0) { //si el array de productos no contiene datos se muestra un mensaje que indica la no existencia productos.
        const textoVacio = document.getElementById('texto-vacio');
        textoVacio.innerHTML = `<p class="texto-vacio">No hay productos por mostrar.</p>`
    }
    else { //de lo contrario, se muestran todos los productos del array
        productos.forEach((el) => {
            const articulo = document.createElement('div');
            let precioFormateado = el.precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            articulo.classList.add('articulo');
            articulo.innerHTML = ` 
                                <div class="articulo-img"><img src="${el.url}" alt=""/></div>
                                <div class="articulo-informacion">
                                    <p class="articulo-nombre">${el.nombre}</p>
                                    <p class="articulo-precio">$${precioFormateado}</p>
                                </div>
                                <div>
                                    <button class="articulo-button">Comprar</button>
                                </div>`
            
            seccionProductos.appendChild(articulo);
        });
    }
};
const borrarArticulos = () => {
        //borra el párrafo de No hay productos para mostrar
        const textoVacio = document.getElementById('texto-vacio');
        textoVacio.innerHTML = `<p class="texto-vacio"></p>`
        //borra todos los productos mostrados
        seccionProductos.innerHTML = '';
};
const cargarEventos = () => {
    //evento "click" del botón 'Buscar' producto
    buscarProducto.addEventListener("click",() => {
        let filtroProductos = [];
        let campoBusqueda = "";
        if(tipoFiltro.value === "1") {
            //busca por nombre del producto value = 1
            filtroProductos = totalProductos.filter((el) => (el.nombre.toLowerCase()).includes(textoABuscar.value.toLowerCase()));
        }
        else {
            //busca por categoría del producto value = 2
            filtroProductos = totalProductos.filter((el) => (el.categoria.toLowerCase()).includes(textoABuscar.value.toLowerCase()));
        }
        cargarProductos(filtroProductos);
    });

    //evento "input" de la caja de texto donde se ingresa el producto a buscar
    textoABuscar.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        if(!value) { //si "value" no tiene ningún valor entonces se cargan todos los productos
            cargarProductos(totalProductos);
        }
    });

    //evento "click" del dropdown tipo Filtro
    tipoFiltro.addEventListener("change", (e) => {
        const { value } = e.target;
        if(value === "1")  {
            textoABuscar.value = "";
            textoABuscar.placeholder = "Producto...";
        }
        else {
            textoABuscar.value = "";
            textoABuscar.placeholder = "Categoría...";
        }
    });
};

/* Ejecutar */
cargarEventos(); //se cargan los eventos
cargarProductos(totalProductos); //se cargan los productos

