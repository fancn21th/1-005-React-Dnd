import { useEffect, FC } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import ItemTypes from "../../../utils/ItemTypes";

type FieldProps = {
  title: String;
};

type CustomButtonGroupProps = {
  $isDragging: Boolean;
};

// refer
//    https://styled-components.com/docs/api#using-custom-props
//    https://styled-components.com/docs/api#transient-props
const CustomButtonGroup = styled(ButtonGroup)<CustomButtonGroupProps>`
  opacity: ${({ $isDragging }) => {
    if ($isDragging) {
      return 0.2;
    }
    return 1;
  }};
`;

const Field: FC<FieldProps> = ({ title = "字段" }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.FIELD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <div>
      <CustomButtonGroup
        fullWidth={true}
        variant="contained"
        aria-label="outlined primary button group"
        ref={drag}
        $isDragging={isDragging}
      >
        <Button>
          <DragIndicatorIcon />
        </Button>
        <Button>{title}</Button>
        <Button>
          <DeleteIcon />
        </Button>
      </CustomButtonGroup>
    </div>
  );
};

export default Field;
