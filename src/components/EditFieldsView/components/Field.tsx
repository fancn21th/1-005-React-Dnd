import { useRef, useEffect, FC } from "react";
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
  const dragRef = useRef(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.FIELD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: () => {
      return {
        title,
      };
    },
  }));

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  useEffect(() => {
    drag(dragRef);
  }, [drag]);

  return (
    <div>
      <CustomButtonGroup
        fullWidth={true}
        variant="contained"
        aria-label="outlined primary button group"
        $isDragging={isDragging}
      >
        <Button ref={dragRef}>
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
