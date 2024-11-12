import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onSubmit }) => {

    const [shopNames, setShopNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShopNames = async () => {
            try {
                const response = await axios.get('http://localhost:3026/api/get-shop');
                // console.log("response", response.data.shop);

                setShopNames(response.data.shop);
            } catch (error) {
                console.error("Error fetching shop names:", error);
            }
        };

        fetchShopNames();
    }, []);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        phone: Yup.string().required('Phone is required'),
        role: Yup.string().oneOf(['user', 'admin'], 'Invalid Role').required('Role is required'),
        shopId: Yup.string().required('Shop Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'user',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            shopId: '',
            profileImage: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            try {
                const response = await axios.post('http://localhost:3026/api/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert('Registration successful');
                navigate('/login');
            } catch (error) {
                if (error.response) {
                    console.error('Backend responded with an error:', error.response.data);
                } else if (error.request) {
                    console.error('No response from the backend:', error.request);
                } else {
                    console.error('Error during form submission:', error.message);
                }
                alert('An error occurred during registration');
            }
        },
    });

    return (
        <>
            <h2 className='text-2xl font-bold mb-4'>Registration</h2>
            <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg space-y-6">

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-1 font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className="p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-1 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className="p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="role" className="mb-1 font-medium">Role</label>
                        <select
                            name="role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {formik.touched.role && formik.errors.role ? (
                            <div className="text-red-500 text-sm">{formik.errors.role}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-1 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className="p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="street" className="mb-1 font-medium">Street</label>
                            <input
                                type="text"
                                name="street"
                                onChange={formik.handleChange}
                                value={formik.values.street}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="mb-1 font-medium">City</label>
                            <input
                                type="text"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="state" className="mb-1 font-medium">State</label>
                            <input
                                type="text"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="zip" className="mb-1 font-medium">ZIP</label>
                            <input
                                type="text"
                                name="zip"
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <label htmlFor="country" className="mb-1 font-medium">Country</label>
                            <input
                                type="text"
                                name="country"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="shopName" className="mb-1 font-medium">Shop Name</label>
                        <select
                            name="shopId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.shopId}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="" label="Select a shop" />
                            {shopNames && shopNames.map((shop) => (
                                <option key={shop._id} value={shop._id}>
                                    {shop.shopName}
                                </option>
                            ))}
                        </select>
                        {formik.touched.shopId && formik.errors.shopId ? (
                            <div className="text-red-500 text-sm">{formik.errors.shopId}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="profileImage" className="mb-1 font-medium">Profile Image</label>
                        <input
                            type="file"
                            name="profileImage"
                            onChange={(event) => formik.setFieldValue('profileImage', event.currentTarget.files[0])}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <button type="submit" className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
                    Submit
                </button>
            </form >
        </>
    );
};

export default UserForm;
