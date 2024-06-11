"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInput } from "@/components/formInput";
import PasswordRulesTooltip from "./passwordToolTip";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { REGISTER_ERROR_MESSAGES } from "@/utils/choices";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerFormSchema = z
  .object({
    firstName: z.string({ required_error: "Informe seu nome." }),
    lastName: z.optional(z.string()),
    email: z
      .string({ required_error: "Informe um email." })
      .email("Informe um formato de email válido.")
      .toLowerCase(),
    username: z.string({
      required_error: "Informe um nome de usuário.",
    }),
    password: z
      .string({ required_error: "Informe uma senha." })
      .min(6, "Sua senha deve conter no mínimo 6 dígitos.")
      .regex(new RegExp("[A-Z]"), {
        message: "Sua senha deve conter um caractere maiúsculo.",
      })
      .regex(new RegExp("[a-z]"), {
        message: "Sua senha deve conter um caractere minúsculo.",
      })
      .regex(new RegExp("\\d"), {
        message: "Sua senha deve conter um número.",
      }),
    confirmationPassword: z
      .string({
        required_error: "Este campo é obrigatório.",
      })
      .min(6, "Sua senha deve conter no mínimo 6 dígitos."),
  })
  .superRefine(({ confirmationPassword, password }, ctx) => {
    if (confirmationPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais.",
        path: ["confirmationPassword"],
      });
    }
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const signUpMutation = api.users.register.useMutation({
    onSuccess(data, variables, context) {
      toast.success("Usuário criado com sucesso");
      router.push("/");
    },
    onError(error, variables, context) {
      console.error({ error });
      if (error.message === REGISTER_ERROR_MESSAGES.USERNAME_ALREDY_EXISTS) {
        form.setError("username", { message: error.message });
      }

      if (error.message === REGISTER_ERROR_MESSAGES.EMAIL_ALREDY_EXISTS) {
        form.setError("email", { message: error.message });
      }

      toast.error("Erro ao criar usuário");
    },
  });

  function toggleShowPassword() {
    setShowPassword((prevstate) => !prevstate);
  }

  async function handleSubmit(data: RegisterFormData) {
    console.info({ data });
    signUpMutation.mutate(data);
  }

  return (
    <div className="px-10 py-12 flex flex-col items-center h-auto w-full max-w-md">
      <div className="space-y-4 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <FormInput placeholder="nome@exemplo.com.br" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmationPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1">
                    <FormLabel className="flex items-center gap-1">
                      Confirme sua senha
                    </FormLabel>
                    <PasswordRulesTooltip />
                  </div>

                  <FormControl>
                    <div className="relative w-full">
                      <FormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
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
              Criar conta
            </Button>
          </form>
        </Form>
      </div>

      <footer className="w-full text-white mt-4 text-center font-light">
        Já possui uma conta?{" "}
        <Link
          href="/"
          className="text-violet-500 font-bold no-underline hover:text-primary-light"
        >
          Faça login.
        </Link>
      </footer>
    </div>
  );
}
