<template>
    <div class="main">
        <div class="top">
            <h2>Planes pensados para tu negocio.</h2>
        </div>

        <div class="bottom">
            <div class="card">
                <h3>EMPRENDEDOR</h3>
                <p>$10.000 <br>MENSUAL</p>


                <ul>
                    <li>
                        <i class="bi bi-check-lg"></i>
                        100 productos en stock
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        300 ventas
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        1 usuario
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Soporte por email
                    </li>
                </ul>
            </div>

            <div class="card">
                <h3>PYME</h3>
                <p>$20.000 <br>MENSUAL</p>

                <ul>
                    <li>
                        <i class="bi bi-check-lg"></i>
                        500 productos en stock
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        1000 ventas
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        3 usuarios
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Soporte por email y WhatsApp
                    </li>
                </ul>
            </div>

            <div class="card">
                <h3>EMPRESA</h3>
                <p>$40.000<br>MENSUAL</p>

                <ul>
                    <li>
                        <i class="bi bi-check-lg"></i>
                        Productos ilimitados
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Ventas ilimitadas
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        10 usuarios
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Soporte por email y WhatsApp 24/7
                    </li>
                </ul>
            </div>

            <div class="card">
                <h3>PERSONALIZADO</h3>
                <p><a href="https://wa.link/oitb38"><i class="bi bi-whatsapp"></i> Comunicarme con ventas</a><br>MENSUAL</p>


                <ul>
                    <li>
                        <i class="bi bi-check-lg"></i>
                        Productos ilimitados
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Ventas ilimitadas
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Usuarios ilimitados
                    </li>

                    <li>
                        <i class="bi bi-check-lg"></i>
                        Soporte personalizado
                    </li>
                </ul>

            </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button>
          <router-link style="color: white" to="/register">
            Proba Adminiad gratis por 7 días
          </router-link>
        </button>
        </div>

        <div class="box">
            <img src="../../assets/logoNav.png" alt="">
            <h3>¿Necesitas ayuda antes de iniciar?</h3>
            <a href="https://wa.link/wvil4d"> Ponete en contacto con nosotros y te ayudamos.</a>
        </div>
    </div>
</template>

<style scoped>
.main {
    background-color: #ebe3ec !important;
    padding-top: 50px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
}

.top {
    text-align: center;
}

.top h2 {
    font-weight: bold;
    font-size: 35px;
}

.bottom {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    margin-top: 30px;
}

.card {
    border-radius: 25px;
    padding: 10px;
}

.card h3 {
    text-align: center;
    font-weight: bold;

}

.card p {
    text-align: center;
    font-weight: bold;
}

.card ul {
    list-style: none;
}

.card i {
    color: green;
}

button {
    background-color: #312551;
    color: white;
    border-radius: 25px;
    padding: 5px;
    font-weight: bold;
    font-size: 20px;
    width: 35%;
    transition: background-color 0.5s ease;
    border: none;
}

button:hover {
    background-color: #9a3990;
}

.box {
    margin-top: 30px;
    background-color: #312551;
    border-radius: 25px;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: row;
}

.box img {
    width: 100px;
}

.box h3 {
    align-self: center;
}

.box a {
    align-self: center;
    margin-left: 10px;
}

/*********************************************CELULARES********************************************************* */ 
@media (max-width: 768px){
  .main{
    display: flex;
    flex-direction: column;
  }

  .bottom{
    display: flex;
    flex-direction: column;
    row-gap: 10px
  }

  button{
    width: 100%;
  }

  .box{
    display: flex;
    flex-direction: column
  }

  .box a{
    margin: 0;
  }
 
}
</style>