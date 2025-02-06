import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Валідація
  const validationSchema = Yup.object({
    username: Yup.string().required("Обов'язкове поле"),
    password: Yup.string()
      .min(4, "Пароль має містити мінімум 4 символи")
      .required("Обов'язкове поле"),
  });

  const handleLogin = (values, { setSubmitting }) => {
    const { username, password } = values;

    if (username === "admin" && password === "1234") {
      dispatch(login());
      toast.success("Успішний вхід!");  
      navigate("/admin");
    } else {
      toast.error("Невірний логін або пароль");
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
  <div className="bg-white shadow-md rounded-lg p-8 w-96">
    <h1 className="text-2xl font-bold text-center mb-4">Вхід</h1>

    <Formik initialValues={{ username: "", password: "" }} validationSchema={validationSchema} onSubmit={handleLogin}>
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-gray-700">Логін</label>
            <Field type="text" name="username" className="w-full px-3 py-2 border rounded" />
            <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label className="block text-gray-700">Пароль</label>
            <Field type="password" name="password" className="w-full px-3 py-2 border rounded" autoComplete="off" />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Увійти
          </button>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
}

export default LoginPage;
