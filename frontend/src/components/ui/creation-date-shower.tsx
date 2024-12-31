import { FC } from 'react';
import { Text } from '@chakra-ui/react';

type CreationDateShowerPropsT = {
  date: string
}
// "2024-12-31T01:23:51.780Z"
export const CreationDateShower: FC<CreationDateShowerPropsT> = ({ date }) => {
  if (!date) return null;

  const provitional: string[] = [];
  provitional.push(date.slice(8, 10));
  provitional.push('-');
  provitional.push(date.slice(5, 7));
  provitional.push('-');
  provitional.push(date.slice(0, 4));

  return (
    <Text>
      Creado:&nbsp;<b>{provitional.join('')}</b>
    </Text>  
  );
}