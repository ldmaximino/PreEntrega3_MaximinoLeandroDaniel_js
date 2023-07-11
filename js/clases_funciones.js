//Importar
import { bdProductos } from "./bdProductos.js"; //Base de datos de productos disponibles
import { bdFPago } from "./bdFPago.js"; //opciones de pago

//------------------------------------------------------------------- DECLARACION DE VARIABLES Y CONSTANTES ----------------------------------------------
const textoAlternativo = document.getElementById('texto-alternativo');
const cantidadProdEncontrados = document.getElementById('total-productos');
const seccionProductos = document.getElementById("productos");
const textoABuscar = document.querySelector("#texto-filtro");
const buscarProducto = document.querySelector("#buscar");
const tipoFiltro = document.querySelector("#tipo-filtro");
const carrito = document.querySelector(".carrito");
const totalesCarrito = document.querySelector(".totales-carrito");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const modalContainerTitulo = document.querySelector(".modal-container-titulo");
const cerrarModal = document.querySelector(".modal-close");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const finalizarCompra = document.querySelector("#finalizar-compra");
const modalFinCompra = document.querySelector(".modal-fincompra");
const cerrarFinCompra = document.querySelector(".close-fincompra");
const volverAlCarrito = document.querySelector(".volver-carrito");
const selectFPago = document.querySelector(".formapago");
const finalizarPago = document.querySelector(".finalizar-pago");
const carritoFijo = document.querySelector(".carrito-fijo");
export const totalProductos = [...bdProductos];
let miCarrito = [];
let totalFinalCarrito = 0;
let cantCuota = 0;
let importeCuota = 0;

//------------------------------------------------------------------- EXPRESIONES REGULARES ----------------------------------------------
const regexEMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //para validar correo electrónico
const regexApellidoNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/; //para validar ingreso de Apellido y Nombre

//----------------------------------------------------------------------------- DECLARACION DE CLASES ----------------------------------------------------
//clase del carrito de compra
class CarritoCompra {
    constructor(codigo, nombre, cantidad, precio) { //me resulta manejar más fácil así al constructor que utilizando desestructuración
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    //Se declaran las funciones get y set que se van a utilizar
    getCodigo = function () {
        return this.codigo;
    }
    getNombre = function () {
        return this.nombre;
    }
    getCantidad = function () {
        return this.cantidad;
    }
    getPrecio = function () {
        return this.precio;
    }
    setCantidad = function (cantidad) {
        this.cantidad = cantidad;
    }
};

//----------------------------------------------------------------------------- DECLARACION DE FUNCIONES ----------------------------------------------------
//Lee la clave "micarrito" del localStorage. La clave "micarrito" contiene el total de productos agregado al carrito que todavía no se finalizó o concretó la compra.
export const cargaCarritoLS = () => {
    const micarritoLS = JSON.parse(localStorage.getItem('micarrito')) || []; //se hace la lectura del localstorage para ver si el carrito tiene contenido
    //Instancia todos los registros del carrito
    micarritoLS.forEach((el) => {
        miCarrito.push(new CarritoCompra(el.codigo, el.nombre, el.cantidad, el.precio)); //Se agrega el producto en el carrito
    }); -carrito - 1
    actualizaTotalesCarrito(miCarrito); //actualiza total carrito
};

//Actualiza la clave "micarrito" en el localStorage
const seteaCarritoLS = (miCarrito) => {
    localStorage.setItem("micarrito", JSON.stringify(miCarrito));
    actualizaTotalesCarrito(miCarrito); //actualiza total carrito
};

//Verifica si el producto existe en el carrito. Si existe retorna o devuelve la cantidad de ese producto agregada al carrito y si no lo encuentra devuelve cero.
const verificaCantidadEnCarrito = (codigo = '') => {
    if (miCarrito.length === 0) return 0; //Si el carrito está vacío, retorna 0
    const buscar = miCarrito.find((producto) => producto.getCodigo() === codigo);
    if (buscar) return buscar.getCantidad(); //si encuentra el código en miCarrito, devuelve la cantidad comprada
    return 0; //si no encuentra el código en el carrito, devuelve cero
};

//actualiza Totales del Carrito en el menú superior a la derecha
const actualizaTotalesCarrito = (miCarrito) => {
    const totalProductos = document.querySelector(".productos");
    const totalItems = document.querySelector(".items");
    const totalImporte = document.querySelector(".importe");
    //Items y Total del subtotal del carrito de compras
    const totalItemsSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-2");
    const totalImporteSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-3");
    const totalProductosSubTotalCarrito = document.querySelector(".modal-subtotal-carrito-1");

    //obtiene la totalidad de productos y lo asigna al elemento correspondiente
    totalProductos.textContent = miCarrito.length;
    totalProductosSubTotalCarrito.textContent = `Total Productos: ( ${miCarrito.length} )`;
    //obtiene la totalidad de los items
    const totalItemsCarrito = miCarrito.reduce((totalAcum, valorActual) => {
        return totalAcum + valorActual.getCantidad();
    }, 0);
    totalItems.textContent = totalItemsCarrito;
    totalItemsSubTotalCarrito.textContent = totalItemsCarrito; //total items del subtotal del carrito de compras
    //obtiene importe total del carrito
    const totalImporteCarrito = miCarrito.reduce((totalAcum, valorActual) => {
        return totalAcum + (valorActual.getCantidad() * valorActual.getPrecio());
    }, 0);
    totalFinalCarrito = totalImporteCarrito;
    totalImporte.textContent = '$ ' + totalImporteCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalImporteSubTotalCarrito.textContent = '$ ' + totalImporteCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //total importe del subtotal del carrito
};

//Actualiza cantidad de un producto existente o agrega un producto al carrito
const actualizaMiCarrito = (codigo, nombre, precio, cantidad) => {
    const indice = miCarrito.findIndex((producto) => producto.getCodigo() === codigo);
    (indice >= 0) //Si el método 'findIndex' encuentra el registro indice va a ser igual o mayor a cero, de lo contrario es -1
        ? miCarrito[indice].setCantidad(cantidad + 1) //Actualiza la cantidad del producto en el carrito sumando 1.
        : miCarrito.push(new CarritoCompra(codigo, nombre, 1, precio)); //Se agrega el producto en el carrito
    seteaCarritoLS(miCarrito);
    alertAgregado('success', 'producto agregado', '#dd710c');
};

//Alerta de Producto Agregado al Carrito
const alertAgregado = (icono, titulo, colorFondo) => {
    Toast.fire({
        icon: icono, // success
        title: titulo, // agregado
        background: colorFondo, // #34b555
    });
};
//Librería SweetAlert para producto agregado
const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});
//////////////////////////////////////////

//Muestra los productos disponibles para la venta en el DOM generando los elementos HTML
export const cargarProductos = (productos) => {
    borrarArticulos();
    if (productos.length === 0) { //si el array de productos no contiene datos se muestra un mensaje que indica la no existencia productos.
        textoAlternativo.innerHTML = `<p class="texto-alternativo">No hay productos por mostrar.</p>`
    }
    else { //de lo contrario, se muestran todos los productos del array
        (textoABuscar.value) && (textoAlternativo.innerHTML = `<p class="texto-alternativo">Resultado de la búsqueda <b>Por ${(tipoFiltro.value === '1' ? "Descripción" : "Categoría")}</b></p>
                                                                   <span class="color-alternativo">'${textoABuscar.value}'</span>`);
        (productos.length > 0) && (cantidadProdEncontrados.innerHTML = `<p class="total-productos">Productos encontrados : <b>${productos.length}</b></p>`);
        productos.forEach((el) => {
            let precioFormateado = el.precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio unitario
            const articulo = document.createElement('div');
            articulo.classList.add('articulo');
            articulo.innerHTML = ` 
                                <div class="articulo-img"><img src="${el.url}" alt=""/></div>
                                <div class="articulo-informacion">
                                    <p class="articulo-nombre">${el.nombre}</p>
                                    <p class="articulo-precio">$${precioFormateado}</p>
                                </div>`
            const botonComprar = document.createElement('button');
            botonComprar.classList.add("articulo-button");
            botonComprar.textContent = "Comprar";
            botonComprar.addEventListener("click", () => {
                agregaArticulo(el.codigo, el.nombre, el.precio);
            });
            articulo.appendChild(botonComprar);
            seccionProductos.appendChild(articulo);
        });
    }
};

//Agrega productos al carrito, previa verificación si el producto ya existe. En ese caso se suma 1 a la cantidad. Si no existe se crea una instancia u objeto invocando a la función actualizaMiCarrito
const agregaArticulo = (codigo, nombre, precio) => {
    let cantidad = verificaCantidadEnCarrito(codigo); //verifica si el código ya existe en el carrito y devuelve la cantidad
    actualizaMiCarrito(codigo, nombre, precio, cantidad);
};

//Borra los productos en el DOM
const borrarArticulos = () => {
    //borra el párrafo de No hay productos para mostrar
    textoAlternativo.innerHTML = `<p class="texto-alternativo"></p>`
    cantidadProdEncontrados.innerHTML = `<p class="total-productos"></p>`
    //borra todos los productos mostrados
    seccionProductos.innerHTML = '';
};
//Filtrar productos
const filtrarProductos = () => {
    let filtroProductos = [];
    (tipoFiltro.value === "1")
        ? filtroProductos = totalProductos.filter((el) => (el.nombre.toLowerCase()).includes(textoABuscar.value.toLowerCase())) //busca por nombre del producto value = 1
        : filtroProductos = totalProductos.filter((el) => (el.categoria.toLowerCase()).includes(textoABuscar.value.toLowerCase())); //busca por categoría del producto value = 2
    return filtroProductos;
};

//HTML CARRITO. Crea el código html dinámico del carrito de compras
const agregaHtmlCarrito = (miCarrito) => {
    const miCarritoOrdenado = miCarrito.slice().sort(function (a, b) {
        return miCarrito.indexOf(b) - miCarrito.indexOf(a);
    });
    miCarritoOrdenado.forEach((el) => {
        const producto = document.createElement('div');
        let precioUnitFormateado = el.getPrecio().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio unitario
        let precioTotal = (el.getPrecio() * el.getCantidad());
        let precioTotalFormateado = precioTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //da formato al precio total
        const urlProducto = buscaURLProducto(el.codigo);
        producto.classList.add('modal-productos');
        producto.id = el.codigo;

        producto.innerHTML = ` 
                            <img class="modal-productos-img" src="${urlProducto.url}" alt="${el.getNombre()}"></img>
                            <span class="modal-productos-col1">${el.getNombre()}</span>
                            <span class="modal-productos-col2">${el.getCantidad()}</span>
                            <span class="modal-productos-col3">${precioUnitFormateado}</span>
                            <span class="modal-productos-col3">${precioTotalFormateado}</span>
                            <a class="modal-productos-eliminar" href="#">X</a>
                            </div>`

        modalContainer.insertBefore(producto, modalContainerTitulo.nextSibling);
        const eliminarProducto = document.querySelector(".modal-productos-eliminar");
        //evento "click" para eliminar un producto del carrito
        eliminarProducto.addEventListener("click", () => {
            confirmaEliminarProducto(miCarrito, el.codigo, el.nombre);
        });

    });
};

//muestra el contenido del carrito de compras
const muestraCarritoCompras = () => {
    if (miCarrito.length === 0) {
        alertaCarritoVacio(0, false);
    }
    else {
        limpiaHtmlCarrito();
        modalShowToggleCarrito();
        agregaHtmlCarrito(miCarrito); //Crea el html para los productos que se encuentran en el carrito
    }
};

//borra un producto del carrito
const borraProducto = (miCarrito, codigoProducto) => {
    //busco el indice correspondiente al objeto
    let index = miCarrito.findIndex((objeto) => {
        return objeto.codigo === codigoProducto;
    });
    //borro el objeto del array del carrito
    if (index !== -1) {
        miCarrito.splice(index, 1);
        seteaCarritoLS(miCarrito);
        const itemABorrar = document.getElementById(codigoProducto);
        itemABorrar.remove();
        if (miCarrito.length === 0) {
            setTimeout(() => {
                modalShowToggleCarrito();
            }, 1500);
        }
    }
};

//solicita la confirmación para eliminar un producto agregado al carrito
const confirmaEliminarProducto = (miCarrito, codigoProducto, nombreProducto) => {
    //Confirma la eliminación?
    const urlProducto = buscaURLProducto(codigoProducto);
    //en esta combiné 2 sweetalerts. 'A confirm dialog, with a function attached to the "Confirm"-button' + 'A custom positioned dialog'
    Swal.fire({
        title: `${nombreProducto} será eliminado! Confirma?`,
        imageUrl: urlProducto.url,
        imageWidth: 80,
        imageHeight: 120,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: 'rgb(11, 168, 11)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmo!'
    }).then((result) => {
        if (result.isConfirmed) {
            borraProducto(miCarrito, codigoProducto);
            let textoTitle = "El producto ha sido eliminado!";
            if (miCarrito.length === 0) textoTitle = "El carrito ha sido vaciado!";
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: textoTitle,
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
};

//Vacía el carrito de compras
const vaciaCarritoCompras = () => {
    Swal.fire({
        title: `El carrito será vaciado! Confirma?`,
        imageWidth: 80,
        imageHeight: 120,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: 'rgb(11, 168, 11)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmo!'
    }).then((result) => {
        if (result.isConfirmed) {
            miCarrito.forEach((el) => {
                const itemABorrar = document.getElementById(el.codigo);
                itemABorrar.remove(); //borra el contenido del html del carrito para cada elemento o producto
            });
            miCarrito.splice(0); //vacía el array
            seteaCarritoLS(miCarrito); //actualiza el localstorage
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El carrito ha sido vaciado!',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                modalShowToggleCarrito();
            }, 1500); //espera 1,5 segundos para quitar el carrito vacío de la pantalla
        }
    })
};

//Avisa que el carrito está vacío en el caso que se quiera acceder por las 3 vías de acceso existentes (Carrito del Menú, Totalizador del Carrito del menú (arriba-derecha) y el carrito flotante (abajo-derecha))
const alertaCarritoVacio = (miliSeg, ocultaModal) => {
    setTimeout(() => {
        (ocultaModal) && modalShowToggleCarrito();
        Swal.fire({
            confirmButtonColor: 'rgb(11, 168, 11)',
            title: 'Carrito de Compras vacío',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }, miliSeg);
};

//Limpia el html del carrito de compras
const limpiaHtmlCarrito = () => {
    const productosModalCarrito = document.querySelectorAll(".modal-productos");
    productosModalCarrito.forEach((div) => {
        div.remove();
    })
};
const buscaURLProducto = ((codigoProducto) => {
    return totalProductos.find((item => item.codigo === codigoProducto));
});
const modalShowToggleCarrito = () => {
    modal.classList.toggle('modal--show');
};
const modalShowToggleFinCompra = () => {
    modalFinCompra.classList.toggle('modal-fincompra--show');
};

//Agrega código html del formulario modal de la forma de apago
const agregaHtmlFPago = () => {
    const totalAPagar = document.querySelector(".importe-totalapagar");
    totalAPagar.textContent = totalFinalCarrito.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //agrega la opción 'Seleccione una opción...' a la lista para obligar al usuario a seleccionar una forma de pago
    const opt = document.createElement('option');
    opt.disabled = true;
    opt.selected = true;
    opt.textContent = "Seleccione una opción...";
    selectFPago.appendChild(opt);
    bdFPago.forEach((op) => {
        let cantPago = "";
        let impCuota = (totalFinalCarrito + (totalFinalCarrito * op.tasa / 100)) / op.cuotas;
        impCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        (op.cuotas > 1) ? cantPago = "pagos" : cantPago = "pago";
        let textoFPago = ` ( ${op.cuotas} ${cantPago} de ${impCuota} )`;
        const opt = document.createElement('option');
        opt.value = op.codigo;
        opt.textContent = op.nombre + textoFPago;
        selectFPago.appendChild(opt)
    });
};
//limpia html de forma de pago
const limpiaHtmlFPago = () => {
    while (selectFPago.firstChild) {
        selectFPago.removeChild(selectFPago.firstChild);
    }
};
/* Validaciones Datos Personales */
const validacionDatosPersonales = () => {
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const email = document.querySelector("#email");
    const domicilio = document.querySelector("#domicilio");
    const ciudad = document.querySelector("#ciudad");
    //Para revisar los datos ingresados se utiliza "Operador Ternario" + "Operador Lógico AND(&&) o de Cortocircuito", así se evita el uso de ELSE.
    //Nombre
    if (!nombre.value) return alertaDatosIngresados('Debe ingresar su nombre.') && false;
    if (!regexApellidoNombre.test(nombre.value)) return alertaDatosIngresados('El nombre ingresado no es válido.') && false;
    //Apellido
    if (!apellido.value) return alertaDatosIngresados('Debe ingresar su apellido.') && false;
    if (!regexApellidoNombre.test(apellido.value)) return alertaDatosIngresados('El apellido ingresado no es válido.') && false;
    //Email
    if (!email.value) return alertaDatosIngresados('Debe ingresar su e-mail.') && false;
    if (!regexEMail.test(email.value)) return alertaDatosIngresados('El correo ingresado no es válido') && false;
    //Domicilio
    if (!domicilio.value) return alertaDatosIngresados('Debe ingresar su domicilio.') && false;
    //Localidad
    if (!ciudad.value) return alertaDatosIngresados('Debe ingresar su ciudad.') && false;

    //si las revisiones/validaciones son correctas se retorna true;
    return true;
};
//Valida la forma de pago
const validaFPago = (opcionSel, value) => {
    if (opcionSel === 0) return alertaDatosIngresados('Debe seleccionar una forma de pago.') && false;
    const buscar = bdFPago.find((el) => el.codigo === value);
    if (buscar) {
        const desFPago = document.querySelector("#descripcion-fpago");
        let cantPago = "";
        let totalPago = (totalFinalCarrito + (totalFinalCarrito * buscar.tasa / 100));
        let impCuota = totalPago / buscar.cuotas;
        impCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalPago = totalPago.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        (buscar.cuotas > 1) ? cantPago = "pagos" : cantPago = "pago";
        if (buscar.cuotas > 1) {
            desFPago.classList.add('descripcion-fpago-siv');
            desFPago.classList.remove('descripcion-fpago-nov');
            desFPago.textContent = `En ${buscar.cuotas} ${cantPago} de $${impCuota}. Total: $${totalPago}. Recargo ${buscar.tasa}%`;

        }
        else {
            desFPago.classList.add('descripcion-fpago-nov');
            desFPago.classList.remove('descripcion-fpago-siv');
            desFPago.textContent = "";
        }
        cantCuota = buscar.cuotas;
        importeCuota = impCuota.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    return true;
};
const alertaDatosIngresados = (texto) => {
    Swal.fire({
        text: texto,
        confirmButtonColor: 'red'
    });
};
//Se solicita al usuario que confirme la compra
const confirmaCompra = () => {
    let descri = "pago";
    (cantCuota > 1) ? descri = "pagos" : descri = "pago";
    Swal.fire({
        title: `Se va a efectuar la compra en ${cantCuota} ${descri} de ${importeCuota}.`,
        text: "Confirma?",
        html:
            '<span style="font-size: 1.5rem;"><b>Confirma?</b></span>',
        imageUrl: './img/compra.jpeg',
        imageWidth: 350,
        imageHeight: 200,
        imageAlt: 'Compra A Confirmar',
        //icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(11, 168, 11)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmo la compra!',
        cancelButtonText: 'No quiero realizar la compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            compraExitosa(); //Si acepta la compra se llama a la función compraExitosa
            Swal.fire({
                position: 'center',
                //icon: 'success',
                imageUrl: './img/graciascompra.jpeg',
                imageWidth: 350,
                imageHeight: 200,
                imageAlt: 'Gracias por su Compra',
                title: 'La compra se realizó con éxito!',
                confirmButtonColor: 'rgb(11, 168, 11)',
                showConfirmButton: true
            })
            setTimeout(() => {
                modalShowToggleFinCompra();
            }, 1500);
        }
    })
};
//si la compra se confirma, se borra el array de miCarrito y se actualiza el localstorage
const compraExitosa = () => {
    miCarrito.splice(0);
    seteaCarritoLS(miCarrito);
};
//----------------------------------------------------------------------------- CARGA TODOS LOS EVENTOS ----------------------------------------------------
export const cargarEventos = () => {
    //evento "click" del botón 'Buscar' producto
    buscarProducto.addEventListener("click", () => {
        const filtroProductos = filtrarProductos();
        cargarProductos(filtroProductos);
    });

    //evento "Enter" de la caja de texto donde se ingresa el producto a buscar
    textoABuscar.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const filtroProductos = filtrarProductos();
            cargarProductos(filtroProductos);
        };
    });

    //evento "input" de la caja de texto donde se ingresa el producto a buscar
    textoABuscar.addEventListener("input", (e) => {
        const { value } = e.target; //desestructuración del objeto "e" para obtener el atributo value
        !value && cargarProductos(totalProductos); //si "value" no tiene ningún valor entonces se cargan todos los productos de la "base de datos"
    });

    //evento "click" del dropdown tipo Filtro
    tipoFiltro.addEventListener("change", (e) => {
        const { value } = e.target;
        if (value === "1") {
            textoABuscar.value = "";
            textoABuscar.placeholder = "Producto...";
        }
        else {
            textoABuscar.value = "";
            const categoriasUnicas = totalProductos.reduce((categorias, producto) => {
                categorias.add(producto.categoria);
                return categorias;
            }, new Set());
            const descripcionCategorias = [...categoriasUnicas].join(', ');
            textoABuscar.placeholder = descripcionCategorias + " ...";
        }
    });

    //evento "click" del carrito del menú. Para visualizar la totalidad del carrito de compras.
    carrito.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

    //evento "click" sobre los totales del carrito del menú. Para visualizar la totalidad del carrito de compras.
    totalesCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

    //evento "click" del carrito fijo (abajo derecha). Para visualizar la totalidad del carrito de compras.
    carritoFijo.addEventListener("click", (e) => {
        e.preventDefault();
        muestraCarritoCompras();
    });

    //evento "click" sobre finalizar compra
    finalizarCompra.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleCarrito(); //cierra el modal del carrito
        setTimeout(() => {
            limpiaHtmlFPago();
            modalShowToggleFinCompra(); //muestra el modal de la finalización de la compra
            agregaHtmlFPago();
        }, 200);

    });

    //evento "click" sobre vaciar carrito de compra
    vaciarCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        vaciaCarritoCompras();
    });

    //evento "click" para cerrar el modal del carrito de compras. Cierra el carrito de compras.
    cerrarModal.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleCarrito();
    });

    //evento "click" para cerrar el modal del formulario de pago.
    cerrarFinCompra.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleFinCompra();
    });

    selectFPago.addEventListener("change", (e) => {
        e.preventDefault();
        validaFPago(selectFPago.selectedIndex, selectFPago.value);
    });

    finalizarPago.addEventListener("click", (e) => {
        e.preventDefault();
        if (validacionDatosPersonales() && validaFPago(selectFPago.selectedIndex)) {
            confirmaCompra();
        }
    })
    volverAlCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        modalShowToggleFinCompra();
        modalShowToggleCarrito();
    });

    //evento "keydown" con key = "Escape" para poder cerrar el modal del carrito con la tecla "ESC"
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove('modal--show');
            modalFinCompra.classList.remove('modal-fincompra--show');
        }
    });
};
