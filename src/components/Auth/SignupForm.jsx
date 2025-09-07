import { useState } from "react";
import { register } from "../../services/authService"; // Make sure you create a signup service
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    // if (form.password !== form.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }
    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    // Call the signup service to create the user
    try {
      const result = await register(form);
      
      if (result.success) {
        navigate("/", {
          state: { showModal: true, modalMessage: "Your account was created successfully!" },
        });
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred while signing up.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#141e30] to-[#123556]">
      <div className="py-6 px-4 md:px-12">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-screen-6xl">
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
                  <label className="text-sm font-medium secondary_text">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    required
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium secondary_text">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    required
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Account Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium secondary_text">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium secondary_text">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div>
                <label className="text-sm font-medium secondary_text">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="text-sm font-medium secondary_text">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-300 py-3 px-4 rounded-lg secondary_text"
                  placeholder="Confirm password"
                />
              </div>

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
