import GeneralModalRoot from "@/components/modal";
import CreateHabitsForm from "./createHabitsForm";
import { useHabitStore } from "@/store/useHabitStore";

export default function CreateHabitsModal() {
  const { isModalOpen, toggleIsModalOpen } = useHabitStore();

  return (
    <GeneralModalRoot
      open={isModalOpen}
      onOpenChange={toggleIsModalOpen}
      title="Novo hábito"
      triggerTitle={<></>}
      size="md"
    >
      <CreateHabitsForm />
    </GeneralModalRoot>
  );
}
