import RegisterForm from "./components/form";

export default function Register() {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center px-10 py-5 bg-zinc-950">
      <header className="w-full flex flex-col items-center justify-center">
        <p className="whitespace-normal text-white text-center md:text-base text-sm flex flex-col gap-2">
          <strong className="text-3xl whitespace-normal">
            Registre-se agora
          </strong>
          comece a construir hábitos saudáveis
        </p>
      </header>
      <RegisterForm />
    </div>
  );
}
