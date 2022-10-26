import { FC } from "react";
import Field from "./components/Field";

interface EditFieldsViewProps {}

const EditFieldsView: FC<EditFieldsViewProps> = () => {
  return <Field title={"姓名"} />;
};

export default EditFieldsView;
