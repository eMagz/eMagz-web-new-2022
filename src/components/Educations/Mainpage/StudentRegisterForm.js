import React, { useState } from "react";

const StudentRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    country: "",
    state: "",
    city: "",
  });
  return (
    <div>
      <h1>Student Registration</h1>
    </div>
  );
};

export default StudentRegisterForm;
