import React from 'react';
import { Form, Container, Image, Stack } from 'react-bootstrap';
import { usePrivate } from '../../hooks/usePrivate';
import { useFormik } from 'formik';

const CreateProduct = () => {
  const {
    formik,
    fileHandler,
  } = usePrivate();

  return (
    <Container className='mx-auto p-5' style={{ maxWidth: '520px', paddingTop: '6.5rem', textAlign: 'center' }}>
      <Stack className='pt-5 pb-5 mb-3 mt-5'>
        <h2 className='text-uppercase text-light mt-5'>Crear producto</h2>
        <form onSubmit={formik.handleSubmit} className="mt-3">
          {/* Resto del formulario utilizando el mismo patrón */}
          {['marca', 'modelo', 'color', 'precio', 'talle', 'detalle', 'descripcion', 'id'].map((fieldName) => (
            <Form.Floating key={fieldName} className="mb-3">
              <Form.Control
                id={fieldName}
                type={
                    fieldName === 'id' ? 'number' :
                    fieldName === 'precio' ? 'number' :
                    fieldName === 'talle' ? 'number' :
                    fieldName === 'color' ? 'color' : 'text'
                  }
                placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                {...formik.getFieldProps(fieldName)}
              />
              <Form.Label htmlFor={fieldName}>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</Form.Label>
              {formik.touched[fieldName] && formik.errors[fieldName] && (
                <div className="error" style={{ color: 'white' }}>
                  {formik.errors[fieldName]}
                </div>
              )}
            </Form.Floating>
          ))}

<Form.Floating className="mb-3">
  <Form.Control
    id="img"
    type="file"
    accept="image/*"  // Asegúrate de tener esta línea para permitir imágenes
    placeholder="Imagen"
    onChange={(e) => {
      formik.setFieldValue('img', e.currentTarget.files[0]);
      fileHandler(e);
    }}
  />
  <Form.Label htmlFor="img">Imagen</Form.Label>
  {formik.touched.img && formik.errors.img && (
    <div className="error" style={{ color: 'white' }}>
      {formik.errors.img}
    </div>
  )}
</Form.Floating>

          {/* Vista previa de la imagen */}
          {formik.values.img && (
            <div className="mb-3">
              <Image
                className="rounded rounded-lg"
                src={URL.createObjectURL(formik.values.img)}
                alt="Vista previa"
                roundedCircle
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-3">
            Agregar
          </button>
        </form>
      </Stack>
    </Container>
  );
};

export default CreateProduct;
