import { FC } from "react";
import { useDrag } from "react-dnd";
import Field from "./components/Field";
import ItemTypes from "../../utils/ItemTypes";

interface EditFieldsViewProps {}

const EditFieldsView: FC<EditFieldsViewProps> = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <Field title={"姓名"} />
    </div>
  );
};

export default EditFieldsView;
