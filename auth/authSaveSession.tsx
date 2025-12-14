"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export enum Role {
  ADMIN = 1,
  PARCEIRO = 2,
  SUPORTE = 3,
  CONTADOR = 4,
  CLIENTE = 5,
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    //console.log(response);

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Credenciais inválidas",
      };
    }

    const cookieStore = await cookies();
    const data: AuthResponse = await response.json();

    cookieStore.set({
      name: "token",
      value: data.token,
      maxAge: data.expiresIn,
    });

    cookieStore.set({
      name: "user",
      value: JSON.stringify(data.user),
      maxAge: data.expiresIn,
    });

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao conectar com o servidor",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  redirect("/");
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}
