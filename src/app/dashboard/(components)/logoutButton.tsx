"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const utils = api.useUtils();
  const router = useRouter();

  const logoutMutation = api.auth.logout.useMutation({
    onSuccess(data, variables, context) {
      utils.users.invalidate();
      router.push("/");
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <Button
      type="button"
      variant={"alt"}
      onClick={handleLogout}
      className="w-full"
    >
      Sair
    </Button>
  );
}
