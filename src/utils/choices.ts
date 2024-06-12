import { CalendarIcon, HomeIcon } from "@heroicons/react/24/outline";
import { SectionProps } from "./types/section";

export const REGISTER_ERROR_MESSAGES = {
  USERNAME_ALREDY_EXISTS: "Nome de usuário já utilizado",
  EMAIL_ALREDY_EXISTS: "Email já utilizado",
};

export const LOGIN_ERROR_MESSAGES = {
  USER_NOT_FOUND: "Usuário não encontrado",
  WRONG_CREDENTIALS: "Senha e/ou nome de usuário inválidos",
};

export const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const homeSection: SectionProps = {
  title: "Home",
  icon: HomeIcon,
  slug: "home",
  href: "/dashboard",
};

export const calendarSection: SectionProps = {
  title: "Calendário",
  icon: CalendarIcon,
  slug: "calendar",
  href: "/dashboard/calendar",
};

export const sections: SectionProps[] = [homeSection, calendarSection];
