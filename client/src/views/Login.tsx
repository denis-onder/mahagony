import LoginForm from "../components/LoginForm";
import { auth } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import onError from "../utils/onError";

export default function Login() {
  const navigate = useNavigate();

  const onLoginButtonClick = async (data: {
    identifier: string;
    password: string;
  }) => {
    try {
      const token = await auth.login(data.identifier, data.password);

      if (token) {
        toast.success("You are logged in!");
        navigate("/dashboard");
      }
    } catch (error) {
      onError(error);
    }
  };
  return (
    <div>
      <LoginForm onLoginButtonClick={onLoginButtonClick} />
    </div>
  );
}
