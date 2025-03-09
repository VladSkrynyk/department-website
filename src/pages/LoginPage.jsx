import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/auth/authApiSlice";
import { login } from "../redux/auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  // Валідація
  const validationSchema = Yup.object({
    email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
    password: Yup.string()
      .min(4, "Пароль має містити мінімум 4 символи")
      .required("Обов'язкове поле"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await loginUser(values).unwrap();
      dispatch(login()); // Просто викликаємо login без аргументів
      toast.success("Успішний вхід!");
      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || "Помилка входу");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Вхід</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <Field type="email" name="email" className="w-full px-3 py-2 border rounded" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-gray-700">Пароль</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border rounded pr-10"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none active:bg-transparent"
                    style={{ backgroundColor: 'transparent' }}  // Окремо вказано, щоб фон був прозорим
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>



              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                {isSubmitting || isLoading ? "Зачекайте..." : "Увійти"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
