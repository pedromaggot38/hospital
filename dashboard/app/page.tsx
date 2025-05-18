import AuthForm from "@/components/AuthForm";
import { auth } from "@/lib/auth";
import { checkRootExists } from "@/lib/data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth()
  if (session) redirect('/dashboard')

  const rootExists = await checkRootExists();

  if (rootExists === null) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  const type = rootExists ? "SIGN_IN" : "SIGN_UP";
  const defaultValues = rootExists
    ? { username: "", password: "" }
    : {
      username: "",
      password: "",
      passwordConfirm: "",
      name: "",
      email: "",
      phone: "",
      image: "",
    };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm
          type={type}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
