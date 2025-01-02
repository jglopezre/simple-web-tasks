import { Button } from '@/components/ui/button';
import { Text } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { useErrorAdviceContext } from '@/customHooks';


const messageSelector = (status?: number) => {
  switch (status) {
    case 400:
      return 'Por favor revise la información que está enviando, debe llenar los campos requeridos';
    
    case 404:
      return 'El recurso que esta consultando no existe, por favor vuelva a intentarlo';

    case 500:
      return 'Hay un problema en la plataforma, por favor espere unos minutos y vuelva a intentarlo';
    
    default:
      return 'Hay problema de comunicación con el servidor, por favor espere unos minutos y vuelva a intentarlo';
  }
} 

export const ErrorDialog = () => {
  const { getErrorState, unsetError } = useErrorAdviceContext();

  return (
    <DialogRoot lazyMount open={getErrorState().isOpen} onOpenChange={unsetError}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ha ocurrido un Problema!</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            {messageSelector(getErrorState().status)}
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Volver</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
