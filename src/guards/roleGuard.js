import  { SimpleCrypto } from 'simple-crypto-js';
import { secretKey } from '@/components/dashboard/Auth/registerComponent.vue';

const authGuard = (to, from, next) => {
  const token = localStorage.getItem('userToken');
  const simpleCrypto=new SimpleCrypto(secretKey)
  const userRole = localStorage.getItem('role'); // Suponiendo que tienes almacenado el rol del usuario en localStorage
  const decipherRole=simpleCrypto.decrypt(userRole)


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || token === 'undefined') { // Asegúrate de manejar el caso en que el token sea 'undefined'
      next('/home');
    } else if (decipherRole === 'user' || decipherRole === 'administrador') { // Si el usuario tiene el rol de 'user' o 'administrador', no permitir el acceso
      next('/home'); // Puedes redirigir a una página de acceso denegado o a donde desees
    } else {
      next();
    }
  } else {
    next();
  }
};

export default authGuard;
