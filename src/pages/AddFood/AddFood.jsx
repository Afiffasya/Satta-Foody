import React, {useState} from "react";
import axios from "axios";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import ImageForm from "../../components/ImageForm/ImageForm";
import "./AddFood.css";

const AddFood = () => {
  const [uploadImage, setUploadImage] = useState("");

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
      data: {
        name: values.name,
        description: values.description,
        imageUrl: uploadImage,
        ingredients: values.ingredients,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        alert("Food Successfully Created!");
        window.location.href = "/our-recipes";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label
            className="form-label fw-bold mb-1"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <input className="form-control" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="container-fluid d-flex align-items-center py-5">
        <Formik
          initialValues={{
            name: "",
            description: "",
            ingredients: [""],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={onSubmit}
        >
          <div className="card mx-auto shadow sign-up-card py-3 px-2">
            <div className="card-body">
              <h2 className="title text-center mb-4">Add Food</h2>
              <Form>
                <InputText
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Food Name"
                />
                <InputText
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Description"
                />
                <ImageForm onChange={(value) => setUploadImage(value)} />

                <div className="row mb-3">
                  <div className="col-lg-12">
                    <label className="form-label fw-bold mb-1">
                      Ingredients
                    </label>
                    <FieldArray name="ingredients">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { ingredients } = values;
                        return (
                          <div>
                            {ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="d-flex input-group mb-1"
                              >
                                <Field
                                  name={`ingredients[${index}]`}
                                  placeholder={`Ingredient ${index + 1}`}
                                  className="form-control"
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger "
                                    onClick={() => remove(index)}
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-success "
                                  onClick={() => push("")}
                                >
                                  <i className="ri-add-fill"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </section>
    </>
  );
}

export default AddFood;

// import React, { useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field, FieldArray, useField } from "formik";
// import * as Yup from "yup";
// import ImageForm from "../../components/ImageForm/ImageForm";
// import {
//   Button,
//   Col,
//   Container,
//   Form as BootstrapForm,
//   Row,
// } from "react-bootstrap";
// import "./AddFood.css";

// const AddFood = () => {
//   const [uploadImage, setUploadImage] = useState("");

//   const onSubmit = (values) => {
//     axios({
//       method: "post",
//       url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
//       data: {
//         name: values.name,
//         description: values.description,
//         imageUrl: uploadImage,
//         ingredients: values.ingredients,
//       },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         apiKey: `${process.env.REACT_APP_APIKEY}`,
//       },
//     })
//       .then((response) => {
//         console.log(response.data.data);
//         alert("Food Successfully Created!");
//         window.location.href = "/our-recipes";
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const InputText = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//       <Form.Group as={Row}>
//         <Form.Label
//           column
//           sm={12}
//           className="fw-bold mb-1"
//           htmlFor={props.id || props.name}
//         >
//           {label}
//         </Form.Label>
//         <Col sm={12}>
//           <Form.Control {...field} {...props} />
//           {meta.touched && meta.error ? (
//             <div className="text-danger">{meta.error}</div>
//           ) : null}
//         </Col>
//       </Form.Group>
//     );
//   };

//   return (
//     <Container fluid className="d-flex align-items-center py-5">
//       <Formik
//         initialValues={{
//           name: "",
//           description: "",
//           ingredients: [""],
//         }}
//         validationSchema={Yup.object({
//           name: Yup.string().required("Required"),
//           description: Yup.string().required("Required"),
//         })}
//         onSubmit={onSubmit}
//       >
//         <BootstrapForm
//           as={Form}
//           className="card mx-auto shadow sign-up-card py-3 px-2"
//         >
//           <div className="card-body">
//             <h2 className="title text-center mb-4">Add Food</h2>
//             <InputText
//               label="Name"
//               name="name"
//               type="text"
//               placeholder="Food Name"
//             />
//             <InputText
//               label="Description"
//               name="description"
//               type="text"
//               placeholder="Description"
//             />
//             <ImageForm onChange={(value) => setUploadImage(value)} />
//             <Form.Group as={Row}>
//               <Form.Label column sm={12} className="fw-bold mb-1">
//                 Ingredients
//               </Form.Label>
//               <Col sm={12}>
//                 <FieldArray name="ingredients">
//                   {(fieldArrayProps) => {
//                     const { push, remove, form } = fieldArrayProps;
//                     const { values } = form;
//                     const { ingredients } = values;
//                     return (
//                       <div>
//                         {ingredients.map((ingredient, index) => (
//                           <div key={index} className="d-flex input-group mb-1">
//                             <Field
//                               name={`ingredients[${index}]`}
//                               placeholder={`Ingredient ${index + 1}`}
//                               className="form-control"
//                             />
//                             {index > 0 && (
//                               <Button
//                                 type="button"
//                                 variant="danger"
//                                 onClick={() => remove(index)}
//                                 className="ms-2"
//                               >
//                                 Remove
//                               </Button>
//                             )}
//                           </div>
//                         ))}
//                         <Button
//                           type="button"
//                           variant="secondary"
//                           onClick={() => push("")}
//                           className="mt-2"
//                         >
//                           Add Ingredient
//                         </Button>
//                       </div>
//                     );
//                   }}
//                 </FieldArray>
//               </Col>
//             </Form.Group>
//             <Button type="submit" variant="primary" className="w-100 mt-3">
//               Submit
//             </Button>
//           </div>
//         </BootstrapForm>
//       </Formik>
//     </Container>
//   );
// };

// export default AddFood;
