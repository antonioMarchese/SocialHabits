"use client";

import { PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import MenuLink from "./menuLink";
import LogoutButton from "./logoutButton";
import { useHabitStore } from "@/store/useHabitStore";
import * as Accordion from "@radix-ui/react-accordion";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { sections } from "@/utils/choices";
import { useSectionStore } from "@/store/useSectionStore";
import { useProfile } from "@/hooks/useProfile";

export default function Sidebar() {
  const { profile } = useProfile();
  const { toggleIsModalOpen } = useHabitStore();
  const { setSelectedSection } = useSectionStore();

  return (
    <nav className="w-full sm:max-w-60 shadow-md sm:shadow-stone-800 sm:flex flex-col divide-y divide-zinc-600 border-b sm:border-b-0 sm:border-r border-zinc-600 sm:h-full">
      <header className="text-zinc-100 w-full hidden sm:flex items-center justify-start gap-2 px-6 py-4">
        <UserCircleIcon className="w-5 h-5" />
        <strong>{profile?.username}</strong>
      </header>
      <MobileSidebar />

      <div className="hidden sm:flex flex-col space-y-2 p-2">
        <MenuLink
          title="Novo hábito"
          icon={PlusIcon}
          onClick={toggleIsModalOpen}
        />
        {sections.map((section) => (
          <MenuLink
            onClick={() => setSelectedSection(section)}
            title={section.title}
            icon={section.icon}
            href={section.href}
          />
        ))}
        <LogoutButton />
      </div>
    </nav>
  );
}

function MobileSidebar() {
  const { profile } = useProfile();
  const { toggleIsModalOpen } = useHabitStore();
  const { setSelectedSection } = useSectionStore();

  return (
    <Accordion.Root
      collapsible
      type="single"
      className="bg-transparent w-full flex items-center justify-end sm:hidden border-none"
    >
      <Accordion.AccordionItem
        className="w-full overflow-hidden"
        value="item-1"
      >
        <Accordion.AccordionTrigger className="flex items-center justify-between w-full px-6 py-4">
          <div className="text-zinc-100 w-full flex items-center justify-start gap-2">
            <UserCircleIcon className="w-5 h-5" />
            <strong>{profile?.username}</strong>
          </div>
          <Bars3Icon className="w-5 h-5 text-white" />
        </Accordion.AccordionTrigger>
        <Accordion.AccordionContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          <div className="flex flex-col space-y-2 px-4 py-2">
            <MenuLink
              title="Novo hábito"
              icon={PlusIcon}
              onClick={toggleIsModalOpen}
            />
            {sections.map((section) => (
              <MenuLink
                onClick={() => setSelectedSection(section)}
                title={section.title}
                icon={section.icon}
                href={section.href}
              />
            ))}

            <LogoutButton />
          </div>
        </Accordion.AccordionContent>
      </Accordion.AccordionItem>
    </Accordion.Root>
  );
}
