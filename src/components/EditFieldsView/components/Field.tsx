import { FC } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag } from "react-dnd";
import ItemTypes from "../../../utils/ItemTypes";

type FieldProps = {
  title: String;
};

type CustomButtonGroupProps = {
  isDragging: Boolean;
};

const CustomButtonGroup = styled(ButtonGroup)<CustomButtonGroupProps>`
  opacity: ${({ isDragging }) => {
    if (isDragging) {
      return 0.2;
    }
    return 1;
  }};
`;

const Field: FC<FieldProps> = ({ title = "字段" }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <CustomButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      ref={drag}
      isDragging={isDragging}
    >
      <Button>
        <DragIndicatorIcon />
      </Button>
      <Button>{title}</Button>
      <Button>
        <DeleteIcon />
      </Button>
    </CustomButtonGroup>
  );
};

export default Field;
