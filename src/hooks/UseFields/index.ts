import { useReducer, useCallback } from "react";

// type and interface
export type FieldType = {
  id: number;
  title: string;
};

interface FieldsState {
  fields: FieldType[];
}

type FieldsAction = {
  type: "move";
  payload: {
    from: number;
    to: number;
  };
};

// reducer
const initialState: FieldsState = {
  fields: [
    {
      id: 1,
      title: "属性A",
    },
    {
      id: 2,
      title: "属性B",
    },
    {
      id: 3,
      title: "属性C",
    },
  ],
};

const reducer = (state: FieldsState, action: FieldsAction): FieldsState => {
  switch (action.type) {
    case "move":
      const fromIndex = action.payload.from;
      let toIndex = action.payload.to;

      let newFields: FieldType[] = [...state.fields];

      // remove from position action.from
      const from = newFields.splice(fromIndex, 1);

      // if move ahead then adjust the inserted position
      toIndex = fromIndex > toIndex ? toIndex : toIndex - 1;

      // move the item to position action.to
      newFields.splice(toIndex, 0, ...from);

      return {
        ...state,
        fields: newFields,
      };
    default:
      throw new Error();
  }
};

export const useFields = (): [
  FieldType[],
  (from: number, to: number) => void
] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const move = useCallback((from: number, to: number) => {
    dispatch({
      type: "move",
      payload: {
        from,
        to,
      },
    });
  }, []);

  return [state.fields, move];
};
