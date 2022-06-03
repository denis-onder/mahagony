import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function onError(error: any): void {
  toast.error(
    error.response?.data?.error || error.message || error || "Unknown error"
  );
}
