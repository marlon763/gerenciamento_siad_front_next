import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-muted hidden lg:block">
        <img
          src="/graf.jpg"
          alt="Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
