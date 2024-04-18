"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import zod from "zod";
import { twMerge } from "tailwind-merge";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderIcon } from "@/icons";

export const formSchema = zod.object({
  userid: zod.string().min(6),
  password: zod.string().min(8),
});

export type FormValues = zod.infer<typeof formSchema>;

const Form = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const handleSignIn = async (data: FormValues) => {
    router.push("/dashboard");
    toast({
      title: "Signed In",
      description: "You have been signed in successfully",
    });
  };

  return (
    <div className="h-full flex-1 bg-default">
      <div className="container-custom-xs flex h-full flex-col justify-center gap-6">
        <div className="upper">
          <h2 className="font-montserrat text-4xl font-bold">Sign In</h2>
          <p className="font-lato">Sign in to your account</p>
        </div>
        <div className="form-container">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4 rounded-[1.25rem] bg-white p-8"
          >
            <div className="input-group flex flex-col gap-2">
              <label htmlFor="userid">User ID</label>
              <input
                className={twMerge(
                  "rounded-[0.625rem] border-2 bg-[#EAEAEA] px-4 py-2 font-lato outline-none",
                  errors.userid ? "border-red-500" : "border-transparent",
                )}
                type="text"
                id="userid"
                placeholder="abc123"
                {...register("userid")}
                title={errors.userid?.message}
              />
            </div>
            <div className="input-group flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className={twMerge(
                  "rounded-[0.625rem] border-2 bg-[#EAEAEA] px-4 py-2 font-lato outline-none",
                  errors.password ? "border-red-500" : "border-transparent",
                )}
                type="password"
                id="password"
                {...register("password")}
                title={errors.password?.message}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 rounded-[0.625rem] bg-black py-4 font-montserrat font-bold text-white transition-colors hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading && <LoaderIcon className="mr-2" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

export const setCookie = (name: string, value: string, days: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name: string): string | undefined => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
    if (cookie.indexOf(cookieName) === 0)
      return cookie.substring(cookieName.length, cookie.length);
  }
  return undefined;
};
