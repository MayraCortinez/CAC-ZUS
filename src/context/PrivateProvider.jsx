import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormik } from 'formik';
import { productValidationSchema } from '../validation/productValidationSchema';

export const PrivateContext = createContext();

const MySwal = withReactContent(Swal);

export const PrivateProvider = ({ children }) => {

  const { productos, getProductos } = useAuth();

  const navigate = useNavigate();

  const productosCollection = collection(db, 'productos');

  const formik = useFormik({
    initialValues: {
      marca: '',
      modelo: '',
      color: '',
      precio: '',
      talle: '',
      detalle: '',
      descripcion: '',
      id: '',
      img: null,
    },
    validationSchema: productValidationSchema,  // Usa el esquema de validación externo
    onSubmit: async (values) => {
      try {
        await addProducto(values);
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    },
  });


//ELIMINAR PRODUCTO
  const deleteProducto = async (id) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      await deleteDoc(productoDoc);
      await getProductos(); // Espera a que getProductos se complete antes de continuar
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: `Eliminarás el producto id: ${id}`,
      text: 'No podrás revertir tu decisión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar producto',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(id);
        Swal.fire('El producto ha sido eliminado con éxito');
      }
    });
  };


//CREAR PRODUCTO
const addProducto = async (values) => {
  const { img, ...productoData } = values;

  try {
    let urlImDesc = '';
    if (img) {
      const archivo = img;
      const refArchivo = ref(storage, `img/${archivo.name}`);
      await uploadBytes(refArchivo, archivo);
      urlImDesc = await getDownloadURL(refArchivo);
    }

    await addDoc(productosCollection, {
      ...productoData,
      img: urlImDesc,
    });

    // Limpiar el formulario después de agregar el producto
    formik.resetForm();

    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto ha sido creado con éxito!',
      showConfirmButton: false,
      timer: 1500,
    });

    console.log(formik.errors); // Aquí imprimes los errores después de enviar el formulario


    navigate('/admin');
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
  }
};

//EDITAR PRODUCTO
  const updateProduct = async (id, producto) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      await updateDoc(productoDoc, producto);
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto ha sido editado con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };


//TRAER PRODUCTO POR ID
  const getProductoById = async (id) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      const productoSnap = await getDoc(productoDoc);
      if (productoSnap.exists()) {
        const productoData = productoSnap.data();
        return productoData;
      } else {
        console.log('El producto no existe');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return null;
    }
  };


  const fileHandler = (e) => {
    const archivo = e.target.files[0];
    formik.setFieldValue('img', archivo);
   
   
  };


  return (
    <PrivateContext.Provider
      value={{
        deleteProducto,
        confirmDelete,
        formik,
        fileHandler,
        updateProduct,
        getProductoById,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};
