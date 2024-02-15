<template>

    <div class="stock-container">
      <div class="searchbar-container">
        <p>Buscar venta:</p>
        <input
          @input="checkInput"
          v-model="productName"
          type="search"
          @keyup.enter="searchProduct(productName)"
          name=""
          placeholder="Buscar venta..."
          id=""
        />
        <div class="date"></div>
      </div>
  
      <div class="table-responsive">
        <table class="table table-hover table-nowrap">
          <thead class="thead-light">
            <tr class="tableRow">
              <th scope="col">Total</th>
              <th scope="col">Forma de pago</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <!-- *************************SI SE BUSCA UN PRODUCTO****************************** -->
            <tr
              v-if="!foundProduct"
              v-for="(product, index) in searchedProducts"
              :key="index"
            >
              <td>
                <span v-if="!editorStatus">{{ product.name }}</span>
                <input name="name" v-else type="text" v-model="product.name" />
              </td>
              <td>
                <span v-if="!editorStatus">{{ product.description }}</span>
                <input
                  name="name"
                  v-else
                  type="text"
                  v-model="product.description"
                />
              </td>
              <td>
                <span v-if="!editorStatus">{{ product.sellPrice }}</span>
                <input
                  name="name"
                  v-else
                  type="text"
                  v-model="product.sellPrice"
                />
              </td>
              <td>
                <span v-if="!editorStatus">{{ product.quantity }}</span>
                <input
                  name="name"
                  v-else
                  type="text"
                  v-model="product.quantity"
                />
              </td>
              <td>
                <span v-if="!editorStatus">{{ product.barCode }}</span>
                <input name="name" v-else type="text" v-model="product.barCode" />
              </td>
              <td v-if="!editorStatus">
                <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
              </td>
              <td v-else>
                <a @click.prevent="updateProduct(product, product._id)" href="#">
                  <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
                </a>
                <a href="#" @click="changeStatusOfEditor">
                  <i style="color: #d02941" class="bi bi-x-circle"></i>
                </a>
              </td>
              <td>
                <a @click.prevent="deleteProduct(product._id)">
                  <i class="bi bi-trash"></i
                ></a>
              </td>
            </tr>
  
            <!--****************************** TODOS LOS PRODUCTOS************************************ -->
            <tr
              @click="setId(sales._id)"
              v-for="(sale, index) in salesArray"
              :key="index"
              v-if="foundProduct"
            >
              <td>
                <span v-if="!editorStatus">{{formatPrice(sale.total)  }}</span>
                <input name="name" v-else type="text" v-model="sale.total" />
              </td>
              
              <td>
                <span v-if="!editorStatus">{{ sale.paymentMethod }}</span>
                <input
                  name="description"
                  v-else
                  type="text"
                  v-model="sale.paymentMethod"
                />
              </td>
              <td>
                <span >{{formatDate(sale.createdAt)  }}</span>
                
              </td>
  
              <td v-if="!editorStatus">
                <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
              </td>
              <td v-else>
                <a @click.prevent="updateProduct(sale, sale._id)" href="#">
                  <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
                </a>
                <a href="#" @click="changeStatusOfEditor">
                  <i style="color: #d02941" class="bi bi-x-circle"></i>
                </a>
              </td>
              <td>
                <a @click.prevent="deleteProduct(sale._id)">
                  <i class="bi bi-trash"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    
    </div>
  </template>
  
  <script>
  import moment from "moment";
  import numeral from "numeral";
  import axios from "axios";
  
  export default {
    data() {
      return {
        salesArray: [],
        product_id: null,
        editorStatus: false,
        formStatus: false,
        data: {
          name: "",
          description: "",
          sellPrice: "",
          quantity: "",
          barCode: "",
          expirationDate: new Date(),
        },
        productName: "",
        selectedProduct: {},
        foundProduct: true,
        searchedProducts: [],
      };
    },
    methods: {
      // *****************************************LLAMADAS A LA API*******************************
      async getAllProducts() {
        try {
          const result = await axios.get(
            "https://api-gestion-ahil.onrender.com/business/sales/65bfdff8a75ffb8fb6be8937"
          );
          const sales = result.data;
          this.salesArray = sales;
          console.log(this.salesArray);
        } catch (error) {
          console.log(error);
        }
      },
      async updateProduct(product, id) {
        try {
          // const formattedExpirationDate = moment
          //   .utc(buy.expirationDate)
          //   .add(1, "days")
          //   .format("YYYY-MM-DD");

          await axios.put(`https://api-gestion-ahil.onrender.com/sales/${id}`, {

            total: product.name,
            paymentMethod: product.description,
           
          });
  
          this.getAllProducts();
          this.changeStatusOfEditor();
        } catch (error) {
          console.log("Error al actualizar");
        }
      },
      async deleteProduct(id) {
        try {
          if (
            window.confirm("¿Estás seguro de que deseas realizar esta acción?")
          ) {

            await axios.delete(`https://api-gestion-ahil.onrender.com/sales/${id}`);

            window.alert("Producto eliminado");
            this.getAllProducts();
          } else {
            window.alert("Accion cancelada");
          }
        } catch (error) {
          console.log(error);
        }
      },
      async createNewProduct() {
        try {
          if (
            !this.data.name ||
            !this.data.description ||
            !this.data.sellPrice ||
            !this.data.quantity
          ) {
            window.alert("Los campos no deben estar vacíos");
          } else {
            const newProduct = await axios.post(
              "https://api-gestion-ahil.onrender.com/products",
              {
                name: this.data.name,
                description: this.data.description,
                sellPrice: this.data.sellPrice,
                quantity: this.data.quantity,
                barCode: this.data.barCode,
                businessId: "65bfdff8a75ffb8fb6be8937",
              }
            );
            this.data.name = "";
            this.data.description = "";
            this.data.sellPrice = "";
            this.data.quantity = "";
            this.data.barCode = "";
            this.getAllProducts();
  
            setTimeout(() => {
              this.changeStatusOfForm();
            }, 0);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
      async searchProduct(productName) {
        try {
          const product = await axios.get(
            `https://api-gestion-ahil.onrender.com/products/65bfdff8a75ffb8fb6be8937/search/${productName}`
          );
          const productoEncontrado = product.data;
  
          this.searchedProducts = productoEncontrado;
          console.log("Producto encontrado", this.searchedProducts);
  
          if (productoEncontrado) {
            this.searchedProducts = productoEncontrado;
            this.foundProduct = false;
            console.log("Un solo producto: ", this.foundProduct);
          } else {
            this.searchedProducts = [];
            this.foundProduct = false;
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
  
      // *****************************************************************************************
      formatPrice(price) {
        return numeral(price).format("$0,0.00");
      },
      formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
      },
      checkInput() {
        if (this.productName === "") {
          this.foundProduct = true;
        }
      },
      setId(id) {
        this.product_id = id;
        console.log(this.product_id);
      },
      changeStatusOfEditor() {
        this.editorStatus = !this.editorStatus;
      },
      changeStatusOfForm() {
        this.formStatus = !this.formStatus;
        console.log("Formulario abierto/cerrado");
      },
    },
    mounted() {
      this.getAllProducts();
    },
  };
  </script>
  
  <style scoped>
  .top-container button {
    margin: 10px;
    border-radius: 15px;
    padding: 10px;
    border: none;
    background-color: #149c68;
    color: white;
    font-size: 18px;
    font-weight: bold;
    transition: transform 0.3s ease;
  }
  
  .top-container button:hover {
    transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
  }
  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    margin-bottom: 5px;
  
    width: 100%;
  }
  .searchbar-container {
    display: flex;
    align-items: center; /* Alinear verticalmente los elementos */
  }
  
  .searchbar-container p {
    margin-right: 10px; /* Ajustar márgenes si es necesario */
    margin-top: 10px;
    font-size: 20px;
    padding: 10px;
    font-weight: bolder;
  }
  
  .searchbar-container input {
    margin-left: 20px; /* Ajustar márgenes si es necesario */
    width: 50%;
    border-radius: 15px;
    border: 1px solid #574f7a;
    padding: 10px;
  }
  
  .table-responsive {
    margin: 10px;
    /* background-color: #1a1a1a; */
    background-color: #1a1a1a;
    border-radius: 15px;
    padding: 5px;
  }
  
  .tableRow th {
    background-color: #1a1a1a;
    color: white;
  }
  
  .tableRow td {
    background-color: #1a1a1a;
    color: white;
  }
  
  .table-body td {
    background-color: #1a1a1a;
    color: white;
  }
  
  .expenses-form {
    width: 40%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    position: absolute;
    top: 10%;
    right: 30%;
  }
  
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .expenses-form {
    h3 {
      color: white;
    }
  }
  
  label {
    font-size: 18px;
  }
  
  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    margin-bottom: 5px;
  
    width: 100%;
  }
  
  .btn-cancel,
  .btn-confirm {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn-cancel {
    background-color: #ccc;
    color: black;
    margin-bottom: 5px;
    background-color: #d02941;
    font-size: 20px;
    font-weight: bold;
  }
  
  .btn-confirm {
    background-color: #149c68;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
  </style>
