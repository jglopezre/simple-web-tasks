import { Reducer } from "react";
import { ErrorStateReducerAction, ErrorStateReducerT } from "@/types"

const errorStateReducer: Reducer<ErrorStateReducerT, ErrorStateReducerAction> = (prevState, action) => {
  switch (action.type) {
    case 'ERROR_STATE-close-error':
      return {
        isOpen: false,
        status: 0,
      } 
    
    case 'ERROR_STATE-open-error':
      if (action.payload) {
        return {
          status: action.payload.status,
          isOpen: true,
        }
      }
      return {
        status: 0,
        isOpen: true,
      }

    default:
      console.warn(`El action.type no es valido, se devuelve el estado original. [action.type = ${action.type}]`);
      return prevState;
  }
};

export default errorStateReducer;
