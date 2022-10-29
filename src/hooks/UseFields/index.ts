import { useReducer, useCallback } from "react";
import update from "immutability-helper";

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
    dragId: number;
    dropId: number;
    beforeDroppedItem: boolean;
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
    {
      id: 4,
      title: "属性D",
    },
    {
      id: 5,
      title: "属性E",
    },
    {
      id: 6,
      title: "属性F",
    },
    {
      id: 7,
      title: "属性G",
    },
  ],
};

const reducer = (state: FieldsState, action: FieldsAction): FieldsState => {
  switch (action.type) {
    case "move":
      const preFields = state.fields;
      const { dragId, dropId, beforeDroppedItem } = action.payload;
      const dragIndex = preFields.findIndex((f) => f.id === dragId);
      let dropIndex = preFields.findIndex((f) => f.id === dropId);
      dropIndex = beforeDroppedItem ? dropIndex : dropIndex + 1;

      if (dragIndex == dropIndex) {
        return state;
      }

      const newFields = update(preFields, {
        $splice: [
          [dragIndex, 1],
          [dropIndex, 0, preFields[dragIndex] as FieldType],
        ],
      });

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
  (from: number, to: number, beforeDroppedItem: boolean) => void
] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const move = useCallback(
    (dragId: number, dropId: number, beforeDroppedItem: boolean) => {
      dispatch({
        type: "move",
        payload: {
          dragId,
          dropId,
          beforeDroppedItem,
        },
      });
    },
    []
  );

  return [state.fields, move];
};
