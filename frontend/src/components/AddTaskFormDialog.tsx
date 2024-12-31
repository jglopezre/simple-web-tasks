import { FC, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAddTaskFormDisclosureContext } from '@/customHooks/useAddTaskFormDisclosureContext';
import { Input, Stack, Textarea } from '@chakra-ui/react';
import { Field } from './ui/field';
import { useCreateTask } from '@/customHooks';
import { PartialRequestTaskObjectT } from '@/types';

export const AddTaskFormDialog: FC = () => {
  const [dataState, setFormDataState] = useState<PartialRequestTaskObjectT>({ title: '', description: '' });
  const { isOpenAddTaskForm, closeAddTaskForm } = useAddTaskFormDisclosureContext();
  const {
    mutate: createTask,
    isPending: isCreatingTaskPending,
  } = useCreateTask();

  const onCloseHandle = () => {
    setFormDataState({ title: '', description: '' })
    closeAddTaskForm();
  }

  const onAcceptHandle = () => {
    createTask({ data: dataState });
  }


  return (
    <DialogRoot open={isOpenAddTaskForm()} onOpenChange={onCloseHandle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nueva Tarea</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <Field label="Titulo">
              <Input
                value={dataState.title}
                onChange={(event) => setFormDataState((state) => ({
                  ...state,
                  title: event.target.value
                }))}
              />
            </Field>
            <Field label="Descripción">
              <Textarea
                value={dataState.description}
                onChange={(event) => setFormDataState((state) => ({
                  ...state,
                  description: event.target.value
                }))}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={onAcceptHandle} loading={isCreatingTaskPending}>Crear Tarea</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
