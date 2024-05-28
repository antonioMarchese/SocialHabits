import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@radix-ui/react-dialog";
import { ReactElement } from "react";
import clsx from "clsx";

export interface GeneralModalRootProps extends DialogProps {
  triggerTitle: string | ReactElement;
  title: string;
  subTitle?: string;
  confirmCallbackfun?: () => void;
  clearCallbackfun?: () => void;
  clearCallbackfunTitle?: string;
  open?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function GeneralModalRoot({
  children,
  triggerTitle,
  title,
  subTitle,
  confirmCallbackfun,
  clearCallbackfun,
  clearCallbackfunTitle,
  open,
  onOpenChange,
  size = "md",
}: GeneralModalRootProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="w-full">{triggerTitle}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/10 backdrop-blur-[2px] z-[9999] fixed inset-0 flex items-center justify-center px-4 py-9 max-h-screen">
          <Dialog.Content
            className={clsx(
              "bg-neutral-300 rounded-xl w-full relative p-8 overflow-y-auto max-h-full data-[state=open]:animate-contentShow",
              {
                "max-w-sm": size === "sm",
                "max-w-md": size === "md",
                "max-w-lg": size === "lg",
              }
            )}
          >
            <Dialog.Title className="text-zinc-900 font-bold text-xl mb-8 flex flex-col gap-2">
              {title}
              {subTitle && (
                <small className="text-zinc-800 text-sm leading-5 font-light">
                  {subTitle}
                </small>
              )}
            </Dialog.Title>
            {children}
            <Dialog.Close asChild>
              <XMarkIcon className="text-error cursor-pointer absolute right-8 top-8 h-6 w-6 " />
            </Dialog.Close>
            <div className="mt-8 w-full flex flex-col items-center justify-center gap-y-2">
              {confirmCallbackfun && (
                <Dialog.Close asChild>
                  <Button
                    onClick={confirmCallbackfun}
                    type="button"
                    variant="action"
                  >
                    Confirmar
                  </Button>
                </Dialog.Close>
              )}
              {clearCallbackfunTitle && (
                <Button
                  onClick={clearCallbackfun}
                  className="border-none text-error normal-case hover:text-encerrado focus:text-error focus:bg-white"
                  type="button"
                  variant="alt"
                >
                  {clearCallbackfunTitle}
                </Button>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
