import { FC } from 'react';
import { Card, Flex } from '@chakra-ui/react';
import { useDeleteTask } from '@/customHooks';
import { useUpdateTask } from '@/customHooks/useUpdateTask';
import { ResponseTaskObjectT } from '@/types';
import { Button } from './button';
import { Status } from './status';
import { CreationDateShower } from './creation-date-shower';

type TaskCardPropsT = Partial<ResponseTaskObjectT> 

export const TaskCard: FC<TaskCardPropsT> = (props) => {
  const { _id, title, description, creationDate, completed } = props;

  const { mutate: updateTask, isPending: updatingIsPending } = useUpdateTask();
  const { mutate: deleteTask, isPending: deletingIsPending } = useDeleteTask();

  const onDeleteHandler = () => {
    deleteTask({ id: _id ?? ''})
  }

  const onCompleteTaskHandler = () => {
    updateTask({ id: _id ?? '', data: { completed: !completed }})
  }

  return (
    <Card.Root>
      <Card.Header>
        <Flex direction="row" gap="4" justifyContent="space-between" >
          <Status value={!completed ? "error" : "success"}>
            { !completed ? "Pendiente" : "Completada" }
          </Status>
          <CreationDateShower date={creationDate ?? ''} />
        </Flex>
      </Card.Header>
      <Card.Body gap="2">
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" loading={deletingIsPending} onClick={onDeleteHandler}>
          Eliminar
        </Button>
        <Button loading={updatingIsPending} onClick={onCompleteTaskHandler}>
          {completed ? "Abrir" : "Completar"}
        </Button>
      </Card.Footer>
    </Card.Root>

  );
}