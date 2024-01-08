<template>
  <div class="sidebar">
    <div class="img-logo">
      <img style="width: 150px" src="../../assets/3.png" alt="" />
      <p>Cuyo Software</p>
    </div>

    <div class="nav-links">
      <a
        href="#"
        :class="{ active: activeLink === 'Inicio' }"
        @click="setActiveLink('Inicio')"
        ><i class="bi bi-house"></i> Inicio
      </a>
      <a
        href="#"
        :class="{ active: activeLink === 'Ventas' }"
        @click="setActiveLink('Ventas')"
        ><i class="bi bi-cart"></i> Ventas</a
      >
      <a href="#" @click="hideHomePage"><i class="bi bi-bag-dash"></i> Compras</a>
      <a href=""><i class="bi bi-bag-dash"></i> Asistente inteligente</a>
      <a href=""><i class="bi bi-bar-chart"></i> Resumen</a>
      <a href=""><i class="bi bi-box-seam"></i> Stock</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "Inicio",
      todayDate: null,
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
    },
    hideHomePage(){
      this.$emit("hideHomePage");
    }
  },
};
</script>

<style scoped>
.img-logo {
  p {
    margin-left: 10px;
    font-size: 30px;
    color: white;
  }
}
.nav-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  row-gap: 30px;
}

.nav-links i {
  font-size: 25px;
}

.nav-links {
  a {
    font-size: 20px;
    text-decoration: none;
    color: white;
    font-weight: lighter;
    transition: color 0.5s, font-size 0.5s;
  }
}

.nav-links a:hover {
  color: #5c39f5;
  font-size: 22px;
}

.active {
  color: #5c39f5 !important;
}
</style>
