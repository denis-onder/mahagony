import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import { UserPayload } from "../domain/User";
import toast from "react-hot-toast";
import RegistrationForm from "../components/RegistrationForm";
import onError from "../utils/onError";

export default function Register() {
  const navigate = useNavigate();
  const onRegisterButtonClick = async (data: UserPayload): Promise<void> => {
    try {
      const registered = await auth.register(data);

      if (registered) {
        navigate("/login");
        toast.success("You are registered! Please login.");
      }
    } catch (error) {
      onError(error);
    }
  };
  return (
    <div>
      <RegistrationForm onRegisterButtonClick={onRegisterButtonClick} />
    </div>
  );
}
