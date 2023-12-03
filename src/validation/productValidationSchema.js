// productValidationSchema.js
import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({

  precio: Yup.number()
    .required('Campo obligatorio')
    .positive('Debe ser un número positivo')
    .test('is-number', 'Debe ser un número', (value) => !isNaN(value)),

  talle: Yup.number()
    .required('Campo obligatorio')
    .positive('Debe ser un número positivo')
    .test('is-number', 'Debe ser un número', (value) => !isNaN(value)),

  id: Yup.number()
    .required('Campo obligatorio')
    .positive('Debe ser un número positivo')
    .test('is-number', 'Debe ser un número', (value) => !isNaN(value)),

  marca: Yup.string()
    .required('Campo obligatorio')
    .trim() // Elimina espacios en blanco al comienzo y al final
    .matches(/^[a-zA-Z]+$/, 'Solo se permiten caracteres alfabéticos'),

  modelo: Yup.string()
    .required('Campo obligatorio')
    .trim() // Elimina espacios en blanco al comienzo y al final
    .matches(/^[a-zA-Z]+$/, 'Solo se permiten caracteres alfabéticos'),

  color: Yup.string()
    .required('Campo obligatorio')
    .trim() // Elimina espacios en blanco al comienzo y al final
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Formato de color inválido'),

  detalle: Yup.string()
    .required('Campo obligatorio')
    .trim() // Elimina espacios en blanco al comienzo y al final
    .matches(/^[a-zA-Z]+$/, 'Solo se permiten caracteres alfabéticos'),

  descripcion: Yup.string()
    .required('Campo obligatorio')
    .trim() // Elimina espacios en blanco al comienzo y al final
    .matches(/^[a-zA-Z]+$/, 'Solo se permiten caracteres alfabéticos'),

  img: Yup.mixed().required('Campo obligatorio'),
});
