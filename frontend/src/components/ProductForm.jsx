import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        type: Yup.string().oneOf(['Solitaire', 'Engagement', 'Wedding', 'Anniversary', 'Casual', 'Other'], "Invalid product type").required("Product type is required"),
        carat: Yup.number().required("Carat is required").positive("Carat must be a positive number"),
        clarity: Yup.string().oneOf(['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2'], "Invalid clarity grade").required("Clarity is required"),
        color: Yup.string().oneOf(['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], "Invalid color grade").required("Color is required"),
        cut: Yup.string().oneOf(['Round', 'Princess', 'Emerald', 'Asscher', 'Marquise', 'Oval', 'Radiant', 'Pear', 'Heart'], "Invalid cut").required("Cut is required"),
        rtsValue: Yup.number().required("RTS Value is required").positive("RTS value must be positive"),
        brownInc: Yup.boolean(),
        lab: Yup.string().oneOf(['GIA', 'IGI', 'AGS', 'HRD', 'Other'], "Invalid lab").required("Lab is required"),
        available: Yup.boolean().required("Availability is required"),
        pricePerCarat: Yup.number().required("Price per carat is required").positive("Price must be positive"),
        margin: Yup.number().required("Margin is required").positive("Margin must be positive"),
    });

    const initialValues = {
        name: '',
        type: '',
        carat: '',
        clarity: '',
        color: '',
        cut: '',
        rtsValue: '',
        brownInc: false,
        lab: '',
        available: false,
        pricePerCarat: '',
        margin: '',
    };

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(
                "http://localhost:3026/api/create-product",
                values,
                {
                    headers: {
                        "authorization": `${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Response:", response);
            navigate("/product-table");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form method="post" className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Product Form</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <Field type="text" id="name" name="name" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Product Type</label>
                        <Field as="select" id="type" name="type" className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option value="">Select Type</option>
                            <option value="Solitaire">Solitaire</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Casual">Casual</option>
                            <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-sm text-red-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="mb-4">
                        <label htmlFor="carat" className="block text-sm font-medium text-gray-700">Carat</label>
                        <Field type="number" id="carat" name="carat" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        <ErrorMessage name="carat" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="clarity" className="block text-sm font-medium text-gray-700">Clarity</label>
                        <Field as="select" id="clarity" name="clarity" className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option value="">Select Clarity</option>
                            <option value="FL">FL</option>
                            <option value="IF">IF</option>
                            <option value="VVS1">VVS1</option>
                            <option value="VVS2">VVS2</option>
                            <option value="VS1">VS1</option>
                            <option value="VS2">VS2</option>
                            <option value="SI1">SI1</option>
                            <option value="SI2">SI2</option>
                            <option value="I1">I1</option>
                            <option value="I2">I2</option>
                        </Field>
                        <ErrorMessage name="clarity" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                        <Field as="select" id="color" name="color" className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option value="">Select Color</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
                            <option value="J">J</option>
                            <option value="K">K</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                        </Field>
                        <ErrorMessage name="color" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cut" className="block text-sm font-medium text-gray-700">Cut</label>
                        <Field as="select" id="cut" name="cut" className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option value="">Select Cut</option>
                            <option value="Round">Round</option>
                            <option value="Princess">Princess</option>
                            <option value="Emerald">Emerald</option>
                            <option value="Asscher">Asscher</option>
                            <option value="Marquise">Marquise</option>
                            <option value="Oval">Oval</option>
                            <option value="Radiant">Radiant</option>
                            <option value="Pear">Pear</option>
                            <option value="Heart">Heart</option>
                        </Field>
                        <ErrorMessage name="cut" component="div" className="text-sm text-red-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="mb-4">
                        <label htmlFor="rtsValue" className="block text-sm font-medium text-gray-700">RTS Value</label>
                        <Field type="number" id="rtsValue" name="rtsValue" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        <ErrorMessage name="rtsValue" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="brownInc" className="block text-sm font-medium text-gray-700">Brown Inclusion</label>
                        <Field type="checkbox" id="brownInc" name="brownInc" className="mt-1 p-2" />
                        <ErrorMessage name="brownInc" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lab" className="block text-sm font-medium text-gray-700">Lab</label>
                        <Field as="select" id="lab" name="lab" className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option value="">Select Lab</option>
                            <option value="GIA">GIA</option>
                            <option value="IGI">IGI</option>
                            <option value="AGS">AGS</option>
                            <option value="HRD">HRD</option>
                            <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage name="lab" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="available" className="block text-sm font-medium text-gray-700">Available</label>
                        <Field type="checkbox" id="available" name="available" className="mt-1 p-2" />
                        <ErrorMessage name="available" component="div" className="text-sm text-red-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="mb-4">
                        <label htmlFor="pricePerCarat" className="block text-sm font-medium text-gray-700">Price per Carat</label>
                        <Field type="number" id="pricePerCarat" name="pricePerCarat" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        <ErrorMessage name="pricePerCarat" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="margin" className="block text-sm font-medium text-gray-700">Margin</label>
                        <Field type="number" id="margin" name="margin" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        <ErrorMessage name="margin" component="div" className="text-sm text-red-500" />
                    </div>

                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default ProductForm;
