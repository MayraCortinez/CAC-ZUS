import {
  getProducts as getFirebaseProducts,
  getProduct as getFirebaseProduct,
} from '../api';

// Traer todos los productos guardados en la variable
export const getProducts = async () => {
  const data = await getFirebaseProducts();
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Llamar producto por id
export const getProductById = async (id) => {
  try {
    const productData = await getFirebaseProduct(id);
    if (productData && productData.exists()) {
      return productData.data();
    } else {
      console.log('El producto no existe');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
};

//Formato precio
export const formatPriceWithCommas = (price) => {
  // Convierte el precio a string y divide en parte entera y decimal
  const parts = price.toString().split('.');
  const integerPart = parts[0];

  // Agrega puntos como separadores de miles en la parte entera
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Retorna el valor formateado
  return formattedIntegerPart;
};
