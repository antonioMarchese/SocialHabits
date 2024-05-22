import { FormInput } from "@/components/formInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordRulesTooltip from "../register/components/passwordToolTip";
import { api } from "@/trpc/react";
import { LOGIN_ERROR_MESSAGES } from "@/utils/choices";
import { redirect, useRouter } from "next/navigation";

const loginFormSchema = z.object({
  username: z.string({
    required_error: "Informe um nome de usuário.",
  }),
  password: z
    .string({ required_error: "Informe uma senha." })
    .min(6, "Sua senha deve conter no mínimo 6 dígitos."),
  /* .regex(new RegExp("[A-Z]"), {
      message: "Sua senha deve conter um caractere maiúsculo.",
    })
    .regex(new RegExp("[a-z]"), {
      message: "Sua senha deve conter um caractere minúsculo.",
    })
    .regex(new RegExp("\\d"), {
      message: "Sua senha deve conter um número.",
    }), */
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess(data, variables, context) {
      console.info("Login realizado com sucesso!");
      console.info({ data });
      setIsLoading(false);
      router.push("/dashboard");
    },
    onError(error, variables, context) {
      console.error("Erro ao realizar login");
      if (error.message === LOGIN_ERROR_MESSAGES.USER_NOT_FOUND) {
        form.setError("username", { message: error.message });
      }
      if (error.message === LOGIN_ERROR_MESSAGES.WRONG_CREDENTIALS) {
        form.setError("password", { message: error.message });
      }
      console.error({ error });
      setIsLoading(false);
    },
  });

  async function handleSubmit(data: LoginFormData) {
    setIsLoading(true);
    loginMutation.mutate(data);
  }

  function toggleShowPassword() {
    setShowPassword((prevstate) => !prevstate);
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <FormInput placeholder="Seu nome de usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-1">
                  <FormLabel className="flex items-center gap-1">
                    Senha
                  </FormLabel>
                  <PasswordRulesTooltip />
                </div>
                <FormControl>
                  <div className="relative w-full">
                    <FormInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      {...field}
                    />
                    {!form.formState.errors.password &&
                      (showPassword ? (
                        <EyeSlashIcon
                          onClick={toggleShowPassword}
                          className="w-6 h-6 text-neutral-400 absolute top-1/4 bottom-1/4 right-4 cursor-pointer hover:text-neutral-600 transition-colors"
                        />
                      ) : (
                        <EyeIcon
                          onClick={toggleShowPassword}
                          className="w-6 h-6 text-neutral-400 absolute top-1/4 bottom-1/4 right-4 cursor-pointer hover:text-neutral-600 transition-colors"
                        />
                      ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id="signUpButton"
            className="w-full h-12 mt-2 bg-violet-600 hover:bg-violet-700 focus:bg-violet-500"
            type="submit"
            disabled={isLoading}
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
