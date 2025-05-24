'use client';

import React, { useState } from 'react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    hire_date: '',
    job_title: '',
    department_id: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    hire_date: '',
    job_title: '',
    department_id: '',
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'department_id' ? parseInt(value, 10) || '' : value, // Handle number input
    }));
    // Clear validation error on input change
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const errors: typeof validationErrors = { // Use typeof to get the type
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      hire_date: '',
      job_title: '',
      department_id: '',
    };
    let isValid = true;

    if (!formData.first_name) { errors.first_name = 'First Name is required'; isValid = false; }
    if (!formData.last_name) { errors.last_name = 'Last Name is required'; isValid = false; }
    if (!formData.email) { errors.email = 'Email is required'; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { errors.email = 'Invalid email format'; isValid = false; }
    if (!formData.job_title) { errors.job_title = 'Job Title is required'; isValid = false; }
    if (!formData.department_id) { errors.department_id = 'Department ID is required'; isValid = false; }

    setValidationErrors(errors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => { // Make handleSubmit async
    e.preventDefault();
    setApiError(null); // Clear previous API errors

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        }
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onEmployeeAdded();
        onClose();
      } else {
        // Assuming API returns JSON with a 'message' field on error
        const errorData = await response.json();
        setApiError(errorData.message || 'Failed to add employee');
      }
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred'); // Handle fetch errors
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) { // Moved outside handleSubmit
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Add New Employee</h2>
        </div>
        {apiError && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 px-6 py-3 rounded relative mx-6 mt-4 text-sm" role="alert">{apiError}</div>
        )}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.first_name ? 'border-red-500' : ''}`}
            />
            {validationErrors.first_name && <p className="text-red-500 text-xs italic mt-1">{validationErrors.first_name}</p>}
          </div>
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">

              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.last_name ? 'border-red-500' : ''}`}
            />
            {validationErrors.last_name && <p className="text-red-500 text-xs italic mt-1">{validationErrors.last_name}</p>}

          </div>
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.email ? 'border-red-500' : ''}`}
            />
            {validationErrors.email && <p className="text-red-500 text-xs italic mt-1">{validationErrors.email}</p>}

          </div>
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.phone_number ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hire_date">
              Hire Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hire_date"
              type="date" // Changed to date type for better input
              name="hire_date"
              value={formData.hire_date.split('T')[0]} // Format date for input[type="date"]
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.hire_date ? 'border-red-500' : ''}`}
            />
            {validationErrors.hire_date && <p className="text-red-500 text-xs italic mt-1">{validationErrors.hire_date}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="job_title">
              Job Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_title"
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.job_title ? 'border-red-500' : ''}`}
            />
            {validationErrors.job_title && <p className="text-red-500 text-xs italic mt-1">{validationErrors.job_title}</p>}
          </div>
          <div className="mb-4 last:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department_id">
              Department ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="department_id"
              type="number" // Changed to number type
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors.department_id ? 'border-red-500' : ''}`}
            />
            {validationErrors.department_id && <p className="text-red-500 text-xs italic mt-1">{validationErrors.department_id}</p>}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;