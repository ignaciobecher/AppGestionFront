<template>
  <div class="top-container">
    <backBtn></backBtn>
    <button @click="showFormFunction">Registrar nuevo producto</button>
  </div>
  <div class="input-class">
    <input
      @input="checkInput"
      v-model="barcode"
      @keyup.enter="getProductBybarCode(barcode)"
      type="search"
      name=""
      id="searchInput"
      placeholder="Buscar producto"
    />
  </div>
  <div class="table-responsive">
    <table class="table table-hover table-nowrap">
      <thead class="thead-light">
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Codigo de barras</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="foundProduct"
          v-for="(product, index) in products"
          :key="index"
          @click="setId(product._id)"
        >
          <td>
            {{ product.name }}
          </td>
          <td>{{ product.description }}</td>
          <td>
            {{ product.quantity }}
          </td>
          <td>{{ product.sellPrice }}</td>
          <td>{{ product.barCode }}</td>
          <td>
            <a @click="getProductUpdateInfo(product._id)"
              ><i class="bi bi-pencil"></i
            ></a>
          </td>
          <td>
            <a @click="deleteProduct(product._id)"
              ><i class="bi bi-trash"></i
            ></a>
          </td>
        </tr>
        <tr v-if="!foundProduct">
          <td>{{ selectedProduct.name }}</td>
          <td>{{ selectedProduct.description }}</td>
          <td>{{ selectedProduct.quantity }}</td>
          <td>{{ selectedProduct.sellPrice }}</td>
          <td>{{ selectedProduct.barCode }}</td>
          <td>
            <a @click="getProductUpdateInfo(selectedProduct._id)"
              ><i class="bi bi-pencil"></i
            ></a>
          </td>
          <td>
            <a @click="deleteProduct(selectedProduct._id)"
              ><i class="bi bi-trash"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <updateProduct v-if="showForm">
    <template v-slot:productName
      ><input v-model="productName" type="text"
    /></template>
    <template v-slot:productDescription
      ><input v-model="productDescription" type="text"
    /></template>
    <template v-slot:productQuantity
      ><input v-model="productQuantity" type="text"
    /></template>
    <template v-slot:productPrice
      ><input v-model="productPrice" type="text"
    /></template>
    <template v-slot:productBarcode
      ><input v-model="productBarcode" type="text"
    /></template>
    <template v-slot:cancelBtn
      ><button @click="showFormFunction" class="btn-cancel" type="button">
        Cancelar
      </button></template
    >
    <template v-slot:confirmBtn
      ><button @click="createProduct" class="btn-cancel" type="button">
        Confirmar
      </button></template
    >
  </updateProduct>
</template>

<script>
import axios from "axios";
import backBtn from "../../components/buttons/backBtnComponent.vue";
import updateProduct from "../forms/updateProductComponent.vue";
export default {
  components: {
    backBtn,
    updateProduct,
  },
  data() {
    return {
      products: [],
      barcode: "",
      selectedProduct: {},
      foundProduct: true,
      product_Id: null,
      showForm: false,
      productName: "",
      productDescription: "",
      productQuantity: "",
      productPrice: "",
      productBarcode: "",
    };
  },
  methods: {
    // ---------------------------------------PEDIDOS A LA API--------------------------------------------------
    async getAllProducts() {
      const response = await axios.get(
        "http://localhost:3000/business/products/65931333d7c90d26950f7332"
      );
      this.products = response.data;
    },
    async getProductBybarCode(barCode) {
      const response = await axios.get(
        `http://localhost:3000/products/barcode/${barCode}/search/65931333d7c90d26950f7332`
      );
      const productoEncontrado = response.data;

      if (productoEncontrado) {
        this.selectedProduct = productoEncontrado;
        this.foundProduct = false;
      } else {
        this.selectedProduct = {};
        this.foundProduct = false;
      }
    },
    async deleteProduct(id) {
      try {
        const confirm = window.confirm("¿Quiere eliminar este producto?");
        if (!confirm) {
          window.alert("No se elimino el producto");
        } else {
          const product = await axios.delete(
            `http://localhost:3000/products/${id}`
          );
          console.log("Producto eliminado:", id);
          this.getAllProducts();
          return "Elemento eliminado";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(id) {
      try {
        const updateProduct = await axios.put(
          `http://localhost:3000/products/${id}`,
          {
            name: this.productName,
            description: this.productDescription,
            sellPrice: this.productPrice,
            quantity: this.productQuantity,
            barCode: this.productBarcode,
          }
        );
        this.showFormFunction();
        this.getAllProducts();
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct() {
      try {
        await axios.post(`http://localhost:3000/products`, {
          name: this.productName,
          description: this.productDescription,
          sellPrice: this.productPrice,
          quantity: this.productQuantity,
          barCode: this.productBarcode,
          businessId:"65931333d7c90d26950f7332"
        });
        this.showFormFunction();
        this.getAllProducts();
      } catch (error) {
        console.log(error);
      }
    },
    async getProductUpdateInfo(id) {
      try {
        this.showFormFunction();
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        const product = response.data;

        this.productName = product.name;
        this.productDescription = product.description;
        this.productQuantity = product.quantity;
        this.productPrice = product.sellPrice;
        this.productBarcode = product.barCode;
      } catch (error) {
        console.log(error);
      }
    },
    // ----------------------------------------------------------------------------------------------------------
    checkInput() {
      if (this.barcode === "") {
        this.foundProduct = true;
      }
    },
    setId(id) {
      this.product_Id = id;
      console.log(this.product_Id);
    },
    showFormFunction() {
      if (this.showForm === false) {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

<style scoped>
.top-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.top-container button {
  grid-column: 6;
  margin: 15px;
  background-color: #007bff;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 20px;
}

h1 {
  color: black;
  margin: 15px;
}

.styled-table {
  border-collapse: separate;
  border-spacing: 10px; /* Define el espacio entre las celdas */
}

/* Estilos adicionales para la tabla si es necesario */
.styled-table th {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.input-class {
  margin: 10px;
}
.highlight-row {
  background-color: #ffcc80; /* Puedes ajustar este color como desees */
}

.update-form {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;

  position: absolute;
  top: 10%;
  right: 20%;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

label {
  font-size: 18px;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-confirm {
  background-color: #007bff;
  color: #fff;
}
</style>
