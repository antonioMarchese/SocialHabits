"use client";

import { api } from "@/trpc/react";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import MenuLink from "./menuLink";
import LogoutButton from "./logoutButton";

export default function Sidebar() {
  const { data: user } = api.users.me.useQuery();

  return (
    <nav className="hidden w-full max-w-60 shadow-md shadow-stone-800 sm:flex flex-col divide-y divide-zinc-600 border-r border-zinc-600 h-full">
      <header className="text-zinc-100 w-full flex items-center justify-start gap-2 px-6 py-4">
        <UserCircleIcon className="w-5 h-5" />
        <strong>{user?.username}</strong>
      </header>
      <div className="flex flex-col space-y-4 gap-3 px-6 py-2">
        <MenuLink title="Calendário" icon={CalendarIcon} href="/" key={0} />
        <LogoutButton />
      </div>
    </nav>
  );
}
