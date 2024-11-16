import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idType, setIdType] = useState('');  // Dropdown for selecting ID type
  const [idValue, setIdValue] = useState(''); // Field for storing the selected ID
  const [vendorType, setVendorType] = useState(''); // Dropdown for vendor type (Store, Doctor, etc.)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false); // For confirmation step

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation for personal information
    if (!username || !email || !password || !confirmPassword || !address || !phoneNumber || !vendorType || !idType || !idValue) {
      setError('All fields are required');
      return;
    }

    // Validation for password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate phone number (10 digits)
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    // Validation for selected ID based on ID type
    if (idType === 'Aadhar' && !/^\d{12}$/.test(idValue)) {
      setError('Aadhar must be exactly 12 digits');
      return;
    }

    if (idType === 'PAN' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(idValue)) {
      setError('Invalid PAN format (e.g., ABCDE1234F)');
      return;
    }

    if (idType === 'Voter ID' && !/^[A-Z0-9]{10}$/.test(idValue)) {
      setError('Voter ID must be 10 characters (alphanumeric)');
      return;
    }

    // Simulate registration logic (e.g., call to backend API)
    setIsConfirmed(true);
  };

  const handleFinalSubmit = () => {
    // Simulate final registration logic
    console.log('Final registration details:', {
      username,
      email,
      password,
      address,
      phoneNumber,
      idType,
      idValue,
      vendorType, // Include the selected vendor type
    });
    setSuccess('Registration successful!');
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {!isConfirmed ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select ID Type:</label>
            <select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              required
            >
              <option value="">Select an ID type</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div>
            <label>{idType ? `${idType} Number:` : 'ID Number:'}</label>
            <input
              type="text"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
              disabled={!idType} // Disable input field until an ID type is selected
              required
            />
          </div>
          <div>
            <label>Select Vendor Type:</label>
            <select
              value={vendorType}
              onChange={(e) => setVendorType(e.target.value)}
              required
            >
              <option value="">Select Vendor Type</option>
              <option value="Store">Store</option>
              <option value="Doctor">Doctor</option>
              <option value="Creche">Creche</option>
              <option value="GroomingServices">Grooming Services</option>
            </select>
          </div>
          <button type="submit">Confirm Registration</button>
        </form>
      ) : (
        <div>
          <h3>Confirm Your Details</h3>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
          <p><strong>{idType} Number:</strong> {idValue}</p>
          <p><strong>Vendor Type:</strong> {vendorType}</p>
          <button onClick={handleFinalSubmit}>Submit Registration</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
