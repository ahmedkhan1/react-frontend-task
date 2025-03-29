import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Loader from '../Loader';

interface FormErrors {
  [key: string]: string;
}

interface UserProfile {
  name: string;
  userName: string;
  email: string;
  address: string;
  permanentAddress: string;
  city: string;
  postalCode: number;
  country: string;
}

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    presentAddress: '',
    permanentAddress: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: 'success', message: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/profile');
        const profile: UserProfile = response.data.data;
        
        setFormData({
          name: profile.name,
          username: profile.userName,
          email: profile.email,
          password: '••••••••••',
          dob: profile.dob,
          presentAddress: profile.address,
          permanentAddress: profile.permanentAddress,
          postalCode: profile.postalCode.toString(),
          city: profile.city,
          country: profile.country,
        });
      } catch (error) {
        setToastMessage({ 
          type: 'error', 
          message: 'Failed to load profile data' 
        });
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setToastMessage({ type: 'success', message: 'Profile picture updated!' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password && formData.password !== '••••••••••') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with letters and numbers';
      }
    }

    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    }

    if (!formData.presentAddress.trim()) {
      newErrors.presentAddress = 'Present Address is required';
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent Address is required';
    }

    const postalCodeRegex = /^\d{5}(-\d{4})?$/;
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    } else if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      setToastMessage({ type: 'success', message: 'Profile updated successfully!' });
      setShowToast(true);
    } else {
      setToastMessage({ type: 'error', message: 'Please fix the errors in the form' });
      setShowToast(true);
    }
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const renderInput = (
    name: keyof typeof formData,
    label: string,
    type: string = 'text'
  ) => (
    <div>
      <label className="block text-sm mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 rounded-lg bg-white border ${
          errors[name] 
            ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
            : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
        } focus:outline-none focus:ring-2`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 relative">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture */}
        <div className="md:w-1/4">
          <div className="relative w-32 mx-auto md:mx-0">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-gray-700 border shadow-sm hover:bg-gray-50"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('name', 'Your Name')}
            {renderInput('username', 'User Name')}
            {renderInput('email', 'Email', 'email')}
            {renderInput('password', 'Password', 'password')}
            {renderInput('dob', 'Date of Birth')}
            {renderInput('presentAddress', 'Present Address')}
            {renderInput('permanentAddress', 'Permanent Address')}
            {renderInput('city', 'City')}
            {renderInput('postalCode', 'Postal Code')}
            {renderInput('country', 'Country')}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-16 py-2.5 bg-black text-white rounded-[15px] hover:bg-gray-800 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 flex items-center gap-2 ${
          toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {toastMessage.type === 'success' ? (
          <Check className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span>{toastMessage.message}</span>
      </div>
    </form>
  );
};

export default EditProfile;