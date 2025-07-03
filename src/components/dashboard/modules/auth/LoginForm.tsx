/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/types/user.type";
import { setCookie } from "@/utils/cookies";
import { varifyToken } from "@/utils/varifyToken";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
  // return alert('hello')
    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.token) as TUser;
  
      if (user?.role !== "ADMIN") {
        toast.error("Unauthorized Access", { id: toastId }); 
        return;
      }
  
      setCookie(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));
  
      toast.success("Login successful", { id: toastId });
  
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to login", { id: toastId }); 
    }
  };
  
  return (
    <div>
      <MyFormWrapper onSubmit={handleSubmit}>
        <MyFormInput name="email" type="email" placeholder="Enter Email" />
        <MyFormInput
          name="password"
          type="password"
          placeholder="Enter Password"
        />

        <Button className="rounded-lg bg-[#0D834A] w-full py-6 text-xl">
          Login
        </Button>
      </MyFormWrapper>
    </div>
  );
};

export default LoginForm;
