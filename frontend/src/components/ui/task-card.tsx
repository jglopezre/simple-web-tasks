import { FC } from "react";
import { Card } from "@chakra-ui/react";
import { useDeleteTask } from "@/customHooks";
import { useUpdateTask } from "@/customHooks/useUpdateTask";
import { ResponseTaskObjectT } from "@/types";
import { Button } from "./button";

type TaskCardPropsT = Partial<ResponseTaskObjectT> 

export const TaskCard: FC<TaskCardPropsT> = (props) => {
  const { _id, title, description, creationDate, status } = props;

  const { mutate: updateTask, isPending: updatingIsPending } = useUpdateTask();
  const { mutate: deleteTask, isPending: deletingIsPending } = useDeleteTask();

  const onDeleteHandler = () => {
    deleteTask({ id: _id ?? ''})
  }

  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button
         variant="outline"
         loading={deletingIsPending}
         onClick={onDeleteHandler}
        >Borrar</Button>
        <Button loading={updatingIsPending}>Editar</Button>
      </Card.Footer>
    </Card.Root>
  );
}