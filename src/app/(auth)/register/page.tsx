import RegisterForm from "./components/form";

export default function Register() {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center px-10 py-5 bg-zinc-900">
      <header className="w-full flex flex-col items-center justify-center">
        <p className="whitespace-normal text-white text-center md:text-base text-sm flex flex-col gap-2">
          <strong className="sm:text-3xl whitespace-normal text-sm">
            Registre-se agora
          </strong>
          e comece a construir hábitos saudáveis
        </p>
      </header>
      <RegisterForm />
    </div>
  );
}
