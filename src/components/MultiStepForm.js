import { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Styles.css"; // Import CSS

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (step === 2) {
      try {
        const response = await fetch("http://localhost:5000/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        alert("niveditha"+result.message); // Show success message
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Multi-Step Form</h2>
        <p className="form-subtitle">Please complete all steps to submit your information</p>

        <div className="progress-bar">
          <div className="progress" style={{ width: step === 1 ? "50%" : "100%" }}></div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="section-title">Personal Information</h3>

            <div className="input-group">
              <label>First Name</label>
              <input {...register("firstName", { required: "First name is required" })} className="input-field" />
              {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input {...register("lastName", { required: "Last name is required" })} className="input-field" />
              {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="input-field" />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="button-container">
              <button type="submit" className="next-button">Next</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="section-title">Address Information</h3>

            <div className="input-group">
              <label>Street Address</label>
              <input {...register("street", { required: "Street address is required" })} className="input-field" />
              {errors.street && <p className="error-message">{errors.street.message}</p>}
            </div>

            <div className="input-group">
              <label>City</label>
              <input {...register("city", { required: "City is required" })} className="input-field" />
              {errors.city && <p className="error-message">{errors.city.message}</p>}
            </div>

            <div className="input-group">
              <label>ZIP Code</label>
              <input {...register("zip", { required: "ZIP code is required", pattern: { value: /^[0-9]{5}$/, message: "Invalid ZIP code" } })} className="input-field" />
              {errors.zip && <p className="error-message">{errors.zip.message}</p>}
            </div>

            <div className="button-container">
              <button type="button" className="back-button" onClick={goBack}>Back</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
