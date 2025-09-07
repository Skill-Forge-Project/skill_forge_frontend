import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Field-level error component
  const FieldError = ({ field }) =>
    errors[field] ? (
      <ul className="text-red-500 text-sm mt-1">
        {Array.isArray(errors[field])
          ? errors[field].map((msg, idx) => <li key={idx}>{msg}</li>)
          : <li>{errors[field]}</li>}
      </ul>
    ) : null;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Client-side basic validation
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    if (!form.password2) newErrors.password2 = "Confirm password is required.";
    if (form.password !== form.password2)
      newErrors.password2 = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call backend register API
    try {
      const result = await register(form);

      if (result.success) {
        navigate("/", {
          state: {
            showModal: true,
            modalMessage: "Your account was created successfully!",
          },
        });
      } else {
        // Set backend errors to state
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ non_field_errors: ["Signup failed."] });
        }
      }
    } catch (_) {
      setErrors({ non_field_errors: ["An error occurred while signing up."] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#141e30] to-[#123556]">
      <div className="py-6 px-4 md:px-12">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-screen-6xl">
          {/* Form Section */}
          <div className="border rounded-lg p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] md:max-w-lg primary_object">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-10">
                <h3 className="text-3xl font-semibold primary_text">Sign up</h3>
                <p className="text-slate-500 text-sm mt-4 leading-relaxed secondary_text">
                  Create an account and start your journey with us.
                </p>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium secondary_text">First Name</label>
                  <input
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="First name"
                  />
                  <FieldError field="first_name" />
                </div>
                <div>
                  <label className="text-sm font-medium secondary_text">Last Name</label>
                  <input
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Last name"
                  />
                  <FieldError field="last_name" />
                </div>
              </div>

              {/* Account Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium secondary_text">Username</label>
                  <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Username"
                  />
                  <FieldError field="username" />
                </div>
                <div>
                  <label className="text-sm font-medium secondary_text">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Email"
                  />
                  <FieldError field="email" />
                </div>
              </div>

              {/* Passwords */}
              <div>
                <label className="text-sm font-medium secondary_text">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                  placeholder="Password"
                />
                <FieldError field="password" />
              </div>
              <div>
                <label className="text-sm font-medium secondary_text">Confirm Password</label>
                <input
                  name="password2"
                  type="password"
                  value={form.password2}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                  placeholder="Confirm password"
                />
                <FieldError field="password2" />
              </div>

              {/* Non-field errors */}
              {errors.non_field_errors && (
                <ul className="text-red-500 text-sm mt-2">
                  {errors.non_field_errors.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              )}

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-[15px] font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xl"
                >
                  Sign up
                </button>
                <p className="text-sm mt-4 text-center secondary_text">
                  Already have an account?{" "}
                  <a
                    href="/"
                    className="text-blue-600 font-medium hover:underline ml-1"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="max-md:mt-8">
            <img
              src="src/assets/img/hero_avatar.png"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="sign up img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
