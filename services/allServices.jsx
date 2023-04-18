import repositories from '/repositories/Repository';
import axios from 'axios'


const {requestOptions, serializeQuery, url, urlMinisitio, urlBest} = repositories()

class allServices {

  DatosUsuario() {

    const token = window.localStorage.getItem('token');
    const siPremium = window.localStorage.getItem('siPremium');
    const siScott = window.localStorage.getItem('siScott');
    const idContact = window.localStorage.getItem('idContacto');
    let datos = [token, siPremium, siScott,idContact];

    return datos;
  }

  // Nuevos Best
  async getMenu() {

    let response;
    await axios.get(`${urlBest}/Estructura/Grupos`,
      { headers: {'Content-Type': 'application/json'} }
    )
      .then((res) => response = res )
      .catch((error) =>{ response = error })
  
    return response;
  }

  async getDetailproduct(productos,minisitios){
    let datos = this.DatosUsuario();

    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let reponse;
    if (!datos[0]){
      reponse = await fetch(`${urlBest}/Catalogo/Listado/${productos}?TipoConsulta=6&IDSitio=${minisitios}`,requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
    }else{
      reponse = await fetch(`${urlBest}/Catalogo/${productos}?TipoConsulta=6&IDSitio=${minisitios}`,config)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
    }
      return reponse;
  }

  async getProducts(items) {
    let datos = this.DatosUsuario();
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let reponse;
    if (!datos[0]){
      reponse = await fetch(`${urlBest}/Catalogo/Listado?${serializeQuery(items)}`, requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      return reponse;
    }else{
      await axios.get(`${urlBest}/Catalogo?${serializeQuery(items)}`, config)
      .then((res) =>{
        const data = res.data;
        let products = [];
        if(Array.isArray(data)){
          data.forEach(item => {
            if(item.siPremiun == datos[1] && item.siScott == datos[2]){
              products.push(item);
            }
            else{
              products.push(item)
            }
          });
          listProduct = products
        }
      }).catch((error) =>{
        //console.log(error);
      })

      // Filtro a productos sin imagen
      const filteredList = listProduct.filter( product => product.imagenes !== "" )

      return filteredList;
    }
  }

  async getFiltros(items){
    let products = [];
    await axios.get(`${urlBest}/Catalogo/getFiltros?${serializeQuery(items)}`, requestOptions)
    .then((res) =>{
      const data = res.data;
      products = data
    }).catch((error) =>{
      // console.log(error);
    })
    // console.log('getFiltros', products);
    return products;
  }

  // Antiguos Andes
  async getProductsOferta() {
    let datos = this.DatosUsuario();
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let reponse;
    if (!datos[0]){
      reponse = await fetch(`${url}/Catalogo/Listado/2?TipoConsulta=0&IDSitio=20`, requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      return reponse;
    }else{
      await axios.get(`${url}/Catalogo/2?TipoConsulta=0&IDSitio=20`, config)
      .then((res) =>{
        const data = res.data;
        let products = [];
        if(Array.isArray(data)){
          data.forEach(item => {
            if(item.siPremiun == datos[1] && item.siScott == datos[2]){
              products.push(item);
            }
            else{
              products.push(item)
            }
          });
          listProduct = products
        }
      }).catch((error) =>{
        //console.log(error);
      })

      // Filtro a productos sin imagen
      const filteredList = listProduct.filter( product => product.imagenes !== "" )

      return filteredList;
    }
  }

  //items trae todas las categorias
  async getCategoriesProductUser(items){

    // console.log('productos', items);

    let datos = this.DatosUsuario();

    // console.log('datos Usuario', datos);
    // console.log('request', requestOptions);
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }

    // console.log('url', `${url}/Catalogo/Listado?${serializeQuery(items)}&top=8`);
    if (!datos[0]){
      const reponse = await fetch(`${url}/Catalogo/Listado?${serializeQuery(items)}&top=8`,requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      // console.log('propductos 2', reponse);
      return reponse;
    }else{
      await axios.get(`${url}/Catalogo?${serializeQuery(items)}`, config)
      .then((res) =>{
        const data = res.data;
        let products = [];

        if(Array.isArray(data)){
          data.forEach(item => {
            if(item.siPremiun == datos[1]){
              products.push(item)
            }
            else{
              products.push(item)
            }
          });

          listProduct = products;
        }
      }).catch((error) =>{
        //console.log(error);
      })

      // console.log('propductos 2', listProduct);
      return listProduct;

      
    }
  }

  async getSubcategories(){
    let datos = this.DatosUsuario();
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let reponse;
    if (!datos[0]){
      reponse = await fetch(`${url}/Catalogo/Listado?${serializeQuery(items)}`, requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      return reponse;
    }else{
      await axios.get(`${url}/Catalogo?${serializeQuery(items)}`, config)
      .then((res) =>{
        const data = res.data;
        let products = [];

        if(Array.isArray(data)){

          data.forEach(item => {
            if(item.siPremiun == datos[1] && item.siScott == datos[2]){
              products.push(item);
            }
            else{
              products.push(item)
            }

          });

          listProduct = products

        }
      }).catch((error) =>{
        //console.log(error);
      })

      return listProduct;
      // return [];
    }
  }

  async getProductScott(){

    let datos = this.DatosUsuario();
    // console.log('api scott', datos);
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }

    await axios.get(`${url}/Catalogo`, config)
    .then((res) =>{
      const data = res.data;
      let products = [];
      // console.log('response', res.data);

      if(Array.isArray(data)){

        data.forEach(item => {
          if(item.siScott == datos[2] ){
            products.push(item) //--> Scott
          }
        });

        listProduct = products

      }
    }).catch((error) =>{
      //console.log(error);
    })

    return listProduct;
  }

  async getBrandproductUser(items){
    let datos = this.DatosUsuario();

    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    const reponse = await fetch(`${url}/Catalogo?${serializeQuery(items)}`,config)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));

      console.log('brand user', reponse);
      return reponse;
  }

  async getBrandproductDetail(items){

    const reponse = await fetch(`${url}/Catalogo/Listado?${serializeQuery(items)}`,requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      return reponse;
  }

  async getProductsByPriceRange(items,prices){
    let datos = this.DatosUsuario();
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let reponse;
    if (!datos[0]){
        reponse = await fetch(`${url}/Catalogo/Listado?${serializeQuery(items)}`, requestOptions)
        .then((response) =>  response.json())
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }else{
      await axios.get(`${url}/Catalogo?${serializeQuery(items)}`, config)
      .then((res) =>{
        const data = res.data;
        let products = [];
        let tempProd = [];
  
        if(Array.isArray(data)){

          //Filtramos los productos por usuarios
          data.forEach(item => {

            if(item.siPremiun == datos[1] && item.siScott == datos[2]){
              tempProd.push(item);
            }
            else{
              tempProd.push(item)
            }

          });

          //Filtramos los precios
          tempProd.forEach(item2 =>{

            if( item2.precio >= parseInt(prices.low) && item2.precio <=  parseInt(prices.high))
            {
              products.push(item2) //--> precio
            }

          });

          listProduct = products

        }
      }).catch((error) =>{
        //console.log(error);
      })

      // Filtro de productos sin imagen
      const filteredList = listProduct.filter( product => product.imagenes !== "" )
  
      return filteredList;
    }
  }

  async getContacts(){
    let datos = this.DatosUsuario();
    let listProduct = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    await axios.get(`${url}/Contacto/GetContactos/${datos[3]}`, config)
    .then((res) =>{
      const data = res.data;
        let products = [];

        if(Array.isArray(data)){
          data.forEach(item2 =>{
            if(item2.siActivo !== 9 && item2.idContacto !== datos[3])
            {
              products.push(item2)
            }
          });
          listProduct = products
        }
    }).catch((error) =>{
      //console.log(error)
    })

    return listProduct;
  }

  async getContact(){
    let datos = this.DatosUsuario();
    let productos = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }

    // console.log('datos api', datos)
    await axios.get(`${url}/Contacto/GetContacto/${datos[3]}`, config)
    .then((res) =>{
      productos = res;
    }).catch((error) =>{
      // console.log(error.response);
    })
    return productos.data;
  }

  async postContactsCreate(data){
    let datos = this.DatosUsuario();
    let head = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    await axios.post(
      `${url}/Contacto/CreateContacto`,
      data,
      {headers: head})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
  
    return response;
  }

  async postContactsDelete(data){

    let datos = this.DatosUsuario();
    let head = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    await axios.post(
      `${url}/Contacto/DeleteContacto`,
      data,
      {headers: head})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
  
    return response;
  }

  async postContactsEdit(data){

    let datos = this.DatosUsuario();
    let head = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    await axios.post(
        `${url}/Contacto/PostContacto`,
        data,
        {headers: head})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
  
    return response;

  }

  async getOrdersT(item){

    let datos = this.DatosUsuario();
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let productos = [];

    await axios.get(`${url}/Ordenes/GetOrdenes/1/${item}`, config)
    .then((res) =>{
      productos = res;
    }).catch((error) =>{
      //console.log(error)
    })
  // console.log(productos.data)
    return productos.data;

  }

  async getFacturas(nrFactura, year){
    let datos = this.DatosUsuario();
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let productos = [];

    await axios.get(`${url}/Ordenes/GetDetalleFactura/3/${nrFactura}/${year}`, config)
    .then((res) =>{
     //console.log(res);
      productos = res;
    }).catch((error) =>{
      //console.log(error)
    })
  
    return productos.data;
  }

  async getBusiness(){
    let datos = this.DatosUsuario();
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    let productos = [];

    await axios.get(`${url}/Cliente/GetClienteEmpresa/${datos[3]}`, config)
    .then((res) =>{
     //console.log(res);
      productos = res;
    }).catch((error) =>{
      //console.log(error)
    })
  
    return productos.data;
  }

  async regions(){
    let regiones = [];

    await axios.get(`${url}/Territorio/getRegion`, requestOptions)
    .then((res) =>{
     //console.log(res);
      regiones = res;
    }).catch((error) =>{
      //console.log(error)
    })
    return regiones.data;
  }

  async communes(region){
    let comunas = [];

    //console.log(region)
    await axios.get(`${url}/Territorio/getComunas/${region}`, requestOptions)
    .then((res) =>{
     //console.log(res);
      comunas = res;
    }).catch((error) =>{
      //console.log(error)
    })
  
    return comunas.data;
  }

  async reservas(){
    let reserva = [];

    await axios.get(`${url}/Catalogo/Reserva?top=10`, requestOptions)
    .then((res) =>{
     //console.log(res);
      reserva = res;
    }).catch((error) =>{
      //console.log(error)
    })
  
    return reserva.data;
  }

  async postComments(data){
    let datos = this.DatosUsuario();
    let head_token = {'Content-Type': 'application/json', 'token': datos[0]}
    let head = {'Content-Type': 'application/json'}
    let response;
    if (!datos[0]){
        await axios.post(
          `${url}/Catalogo/Comentario`,
          data,
          {headers: head})
      .then((res) => response = res )
      .catch((error) =>{ response = error })
    }else{
      await axios.post(
          `${url}/Catalogo/Comentario`,
          data,
          {headers: head_token})
      .then((res) => response = res )
      .catch((error) =>{ response = error })
    }
    return response;
  }

  async postCommentslike(data){

    let datos = this.DatosUsuario();
    let head_token = {'Content-Type': 'application/json', 'token': datos[0]}
    let head = {'Content-Type': 'application/json'}
    let response;
    if (!datos[0]){
        await axios.post(
          `${url}/Catalogo/ComentarioLike`,
          data,
          {headers: head})
      .then((res) => response = res )
      .catch((error) =>{ response = error })
    }else{
      await axios.post(
          `${url}/Catalogo/ComentarioLike`,
          data,
          {headers: head_token})
      .then((res) => response = res )
      .catch((error) =>{ response = error })
    }
    return response;
  }

  async postQuestionAndAnswert(data){

    let datos = this.DatosUsuario();
    let head_token = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    await axios.post(
      `${url}/Catalogo/Pregunta`,
      data,
        {headers: head_token})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
    return response;
  }

  async getMarcasFooters(){
    let reponse = await fetch(`${urlMinisitio}/getMarcasFooter/0`, requestOptions)
    .then((response) =>  response.json())
    .catch((error) => ({ error: JSON.stringify(error) }));
    // console.log(reponse)
    return reponse;
  }

  async getSearchProduct(items) {
    let datos = this.DatosUsuario();
    if (items.length >= 3){
      let reponse = await fetch(`${url}/Catalogo/Buscar/10/1/0/${items}`, requestOptions)
      .then((response) =>  response.json())
      .catch((error) => ({ error: JSON.stringify(error) }));
      // console.log(reponse)
      return reponse;
    }
  }

  async getExecutiveSales(){
    let datos = this.DatosUsuario();
    let productos = [];
    let config = {
      headers:{
        "Content-Type": "application/json",
        "Token": datos[0]
        }
    }
    await axios.get(`${url}/Contacto/GetEjecutivoVenta/${datos[3]}`, config)
    .then((res) =>{
      productos = res;
    }).catch((error) =>{
      //console.log(error)
    })
    return productos.data;
  }

  async getCargos(){
    let reponse = await fetch(`${url}/Contacto/GetCargos`, requestOptions)
    .then((response) =>  response.json())
    .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async postCreateDireccion(data){
    let datos = this.DatosUsuario();
    let head = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    data = { ...data, idContacto: datos[3] }

    await axios.post(
      `${url}/Cliente/CreateDirecionDespacho`,
      data,
      {headers: head})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
  
    return response;
  }

  async updateDireccion(data){
    let datos = this.DatosUsuario();
    let head = {'Content-Type': 'application/json', 'token': datos[0]}
    let response;
    data = { ...data, idContacto: datos[3] }

    await axios.post(
      `${url}/Cliente/EditDirecionDespacho`,
      data,
      {headers: head})
    .then((res) => response = res )
    .catch((error) =>{ response = error })
  
    return response;
  }

  // /Api/v1/Cliente/EditDirecionDespacho
  // {
  //   "idContacto": "string",
  //   "idDireccion": "string",
  //   "linea": 0,                    Enviar linea de la direccion a editar
  //   "tipoDireccion": "string",     S siempre
  //   "direccion": "string",
  //   "nroDireccion": "string",
  //   "codigoPostal": "string",
  //   "idRegion": 0,
  //   "idComuna": 0,
  //   "ciudad": "string",
  //   "localidad": "string"
  // }
}





export default new allServices();
