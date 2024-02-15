<template>
  <div class="stock-container">
    <div class="searchbar-container">
      <p>Buscar producto:</p>
      <input
        @input="checkInput"
        v-model="productName"
        type="search"
        @keyup.enter="searchProduct(productName)"
        name=""
        placeholder="Buscar producto..."
        id=""
      />
      <div class="date"></div>
    </div>

    <div class="top-container">
      <button @click="changeStatusOfForm">Registrar nuevo producto</button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Codigo</th>
            <th scope="col">Stock mínimo</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- *************************SI SE BUSCA UN PRODUCTO****************************** -->
          <tr @click="setId(selectedProduct._id)" v-if="!foundProduct">
            <td>
              <span v-if="!editorStatus">{{ selectedProduct.name }}</span>
              <input
                name="name"
                v-else
                type="text"
                v-model="selectedProduct.name"
              />
            </td>

            <td>
              <span v-if="!editorStatus">{{
                formatPrice(selectedProduct.sellPrice)
              }}</span>
              <input
                name="name"
                v-else
                type="text"
                v-model="selectedProduct.sellPrice"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ selectedProduct.quantity }}</span>
              <input
                name="name"
                v-else
                type="text"
                v-model="selectedProduct.quantity"
              />
            </td>

            <td>
              <span v-if="!editorStatus">{{ selectedProduct.barCode }}</span>
              <input
                name="name"
                v-else
                type="text"
                v-model="selectedProduct.barCode"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{
                selectedProduct.minimumStock
              }}</span>
              <input
                name="name"
                v-else
                type="text"
                v-model="selectedProduct.minimumStock"
              />
            </td>

            <td v-if="!editorStatus">
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click.prevent="updateProduct(selectedProduct, selectedProduct._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#" @click="changeStatusOfEditor">
                <i style="color: #d02941" class="bi bi-x-circle"></i>
              </a>
            </td>
            <td>
              <a @click.prevent="deleteProduct(selectedProduct._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>

          <!--****************************** TODOS LOS PRODUCTOS************************************ -->
          <tr
            @click="setId(product._id)"
            v-for="(product, index) in products"
            :key="index"
            v-if="foundProduct"
          >
            <td>
              <span v-if="!editorStatus">{{ product.name }}</span>
              <input name="name" v-else type="text" v-model="product.name" />
            </td>

            <td>
              <span v-if="!editorStatus">{{
                formatPrice(product.sellPrice)
              }}</span>
              <input
                name="price"
                v-else
                type="text"
                v-model="product.sellPrice"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ product.quantity }}</span>
              <input
                name="quantity"
                v-else
                type="text"
                v-model="product.quantity"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ product.barCode }}</span>
              <input
                name="barcode"
                v-else
                type="text"
                v-model="product.barCode"
              />
            </td>

            <td>
              <span v-if="!editorStatus">{{ product.minimumStock }}</span>
              <input
                name="barcode"
                v-else
                type="text"
                v-model="product.minimumStock"
              />
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
        </tbody>
      </table>
    </div>

    <div v-if="formStatus" class="register-component">
      <div class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nuevo producto</h3>
          <input v-model="data.name" type="text" placeholder="Producto..." />
        
          <input
            v-model="data.quantity"
            type="text"
            placeholder="Cantidad..."
          />
          <select  v-model="selectedCategoryId">
            <option
              v-for="(ids, index) in categoriesIds"
              :value="ids._id"
              :key="ids._id"
            >
              {{ ids.name }}
            </option>
          </select>
          <input v-model="data.sellPrice" type="text" placeholder="Precio..." />
          <input
            v-model="data.barCode"
            type="text"
            placeholder="Codigo de barras..."
          />
          <input
            v-model="data.minimumStock"
            type="text"
            placeholder="Stock mínimo..."
          />
          <input
            v-model="data.expirationDate"
            type="date"
            placeholder="Fecha de vencimiento..."
          />
          <button @click="changeStatusOfForm" class="btn-cancel">
            Cancelar
          </button>
          <button
            @click.prevent="createNewProduct"
            class="btn-confirm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      products: [],
      product_id: null,
      editorStatus: false,
      formStatus: false,
      data: {
        name: "",
        sellPrice: "",
        quantity: "",
        barCode: "",
        expirationDate: new Date(),
        minimumStock:""
      },
      productName: "",
      selectedProduct: {},
      foundProduct: true,
      categoriesIds: [],
      selectedCategoryId: null,
    };
  },
  methods: {
    // *****************************************LLAMADAS A LA API*******************************
    async getAllProducts() {
      try {
        const result = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/products/65bfdff8a75ffb8fb6be8937"
        );
        const data = result.data;
        this.products = data;
        console.log("Todos los productos:", this.products);
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
        await axios.put(`https://api-gestion-ahil.onrender.com/products/${id}`, {
          name: product.name,
          description: product.description,
          quantity: product.quantity,
          sellPrice: product.sellPrice,
          minimumStock: product.minimumStock,
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
          await axios.delete(`https://api-gestion-ahil.onrender.com/products/${id}`);
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
          !this.data.sellPrice ||
          !this.data.quantity
        ) {
          window.alert("Los campos no deben estar vacíos");
        } else {
          const formattedDate = moment(this.data.expirationDate).format(
            "DD-MM-YYYY"
          );
          const newProduct = await axios.post(

            `https://api-gestion-ahil.onrender.com/products/${this.selectedCategoryId}`,

            {
              name: this.data.name,
              sellPrice: this.data.sellPrice,
              quantity: this.data.quantity,
              barCode: this.data.barCode,
              expirationDate: formattedDate,
              minimumStock:this.data.minimumStock,
              businessId: "65bfdff8a75ffb8fb6be8937",
            }
          );
          this.data.name = "";
          this.data.sellPrice = "";
          this.data.quantity = "";
          this.data.barCode = "";
          this.data.minimumStock=""
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
        const productoEncontrado = product.data.product;

        if (productoEncontrado) {
          this.selectedProduct = productoEncontrado;
          this.foundProduct = false;
        } else {
          this.selectedProduct = {};
          this.foundProduct = false;
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async getCategoryesIds() {
      try {
        const res = await axios.get(
          "https://api-gestion-ahil.onrender.com/categoryes/get/categoriyesIds/65bfdff8a75ffb8fb6be8937"
        );

        const cateIds = res.data;
        this.categoriesIds = cateIds;
      } catch (error) {
        throw error;
      }
    },
    // *****************************************************************************************
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
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
    this.getAllProducts(), this.getCategoryesIds();
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

input,
select {
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
