'use client';

import React, { useState, useEffect } from 'react';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any; // Replace 'any' with your Employee type
  onEmployeeUpdated: () => void; // Function to call after successful update
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
 phone_number: '',
    hire_date: '', // Consider a more appropriate type for date
    job_title: '',
    department_id: '', // Consider a number type if it's an ID
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '', // Optional field, no validation error here
    hire_date: '',
    job_title: '',
    department_id: '',
  });

  // Populate form data when the employee prop changes and the modal is open
  useEffect(() => {
    if (isOpen && employee) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
 phone_number: employee.phone_number || '',
        // Assuming hire_date is a string, you might need to format it for input
        hire_date: employee.hire_date ? new Date(employee.hire_date).toISOString().split('T')[0] : '',
        job_title: employee.job_title || '',
        department_id: employee.department_id || '',
      });
 setValidationErrors({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        hire_date: '',
        job_title: '',
        department_id: '',
      });
 setApiError(null); // Clear previous errors
    }
  }, [isOpen, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!formData.first_name.trim()) {
      errors.first_name = 'First Name is required';
      isValid = false;
    }
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.hire_date.trim()) {
      errors.hire_date = 'Hire Date is required';
      isValid = false;
    }
    if (!formData.job_title.trim()) {
      errors.job_title = 'Job Title is required';
      isValid = false;
    }
    if (!formData.department_id.trim()) {
      errors.department_id = 'Department ID is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setApiError(null);

      try {
      const response = await fetch(`/api/employees?id=${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Success
      console.log('Employee updated successfully');
 onEmployeeUpdated(); // Notify parent to re-fetch data
      onClose(); // Close modal
      } catch (err: any) {
      console.error('Error updating employee:', err);
      setApiError(err.message || 'An unexpected error occurred');
      } finally {
      setIsLoading(false);
    }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">Edit Employee</h2>{apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="mb-4 md:mb-0">
 <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`mt-1 block w-full border ${validationErrors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.first_name && <p className="text-red-500 text-xs mt-1">{validationErrors.first_name}</p>}
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`mt-1 block w-full border ${validationErrors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.last_name && <p className="text-red-500 text-xs mt-1">{validationErrors.last_name}</p>}
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            />
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700">Hire Date</label>
            <input
              type="date"
              id="hire_date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
              className={`mt-1 block w-full border ${validationErrors.hire_date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.hire_date && <p className="text-red-500 text-xs mt-1">{validationErrors.hire_date}</p>}
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className={`mt-1 block w-full border ${validationErrors.job_title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.job_title && <p className="text-red-500 text-xs mt-1">{validationErrors.job_title}</p>}
          </div>
 <div className="mb-4 md:mb-0">
 <label htmlFor="department_id" className="block text-sm font-medium text-gray-700">Department ID</label>
            <input
              type="text" // Consider changing to number or select based on your data
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              className={`mt-1 block w-full border ${validationErrors.department_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {validationErrors.department_id && <p className="text-red-500 text-xs mt-1">{validationErrors.department_id}</p>}
          </div>
 </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
 className="mt-6 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={isLoading}
            >Cancel
              Cancel
            </button>
            <button
              type="submit"
              className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
 {isLoading ? 'Saving...' : 'Save Changes'}            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;