"use client";

import * as z from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { login } from "@/auth/authSaveSession";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido!" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres!" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormSchemaType) {
    setLoading(true);

    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // Redireciona baseado na role do usuário, se necessário
      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro inesperado ao fazer login!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Faça login em sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Insira seu e-mail abaixo para acessar sua conta.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Login"}
          </Button>
        </Field>
      </FieldGroup>
      <Toaster position="top-center" duration={4000} richColors />
    </form>
  );
}
