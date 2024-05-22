import { InformationCircleIcon } from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function PasswordRulesTooltip() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <i>
            <InformationCircleIcon className="text-white h-5 w-5" />
          </i>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" align="start">
            <div className="bg-white border py-2 px-4 border-neutral-400 rounded-[4px]">
              <small className="text-xs leading-[18px] text-neutral-600">
                A senha deve conter no mínimo 6 dígitos.
                <br />
                Deve ter ao menos uma letra maiúscula.
                <br />
                Deve ter ao menos uma letra minúscula.
                <br />
                Deve ter ao menos um número.
                <br />
              </small>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
