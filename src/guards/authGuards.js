import { useRouter } from 'vue-router';

const authGuard = (to, from, next) => {
  const token = localStorage.getItem('userToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || token === 'undefined') { // Asegúrate de manejar el caso en que el token sea 'undefined'
      next('/register');
    } else {
      next();
    }
  } else {
    next();
  }
};

export default authGuard;
