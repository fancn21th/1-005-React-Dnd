import { useRef, useEffect, FC } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import ItemTypes from "../../../utils/ItemTypes";

// interface and type
type FieldProps = {
  title: string;
  id: number;
  move: (
    dragIndex: number,
    dropIndex: number,
    beforeDroppedItem: boolean
  ) => void;
};

type CustomButtonGroupProps = {
  $isDragging: boolean;
};

type WrapperProps = {
  showRightDropPositionIndicator: boolean;
  showLeftDropPositionIndicator: boolean;
};

// styled components
const Wrapper = styled.div<WrapperProps>`
  position: relative;

  ${({ showRightDropPositionIndicator, showLeftDropPositionIndicator }) => {
    if (showRightDropPositionIndicator) {
      return `
        &:after {
          content: '';
          position: absolute;
          right: -1px;
          background-color: red;
          width: 10px;
          height: 100%;
          align-self: stretch;
          z-index: 1;
        }
      `;
    }

    if (showLeftDropPositionIndicator) {
      return `
        &:before {
          content: '';
          position: absolute;
          left: -1px;
          background-color: red;
          width: 10px;
          height: 100%;
          align-self: stretch;
          z-index: 1;
        }
      `;
    }

    return "";
  }};
`;

// refer to
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

// FC
const Field: FC<FieldProps> = ({ title, id, move }) => {
  const dragRef = useRef(null);
  const dropRef = useRef(null);

  // drag
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.FIELD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: () => {
      return {
        title,
        id,
      };
    },
  }));

  // drop
  const [{ clientOffset, isOver }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop(item: FieldProps, monitor) {
      const dragId = item.id;
      const dropId = id;

      // Don't replace item with themselves
      if (dragId === dropId) {
        return;
      }

      // determine whether drop in front of target or behind the target
      const _clientOffset = monitor.getClientOffset();

      // todo: not as any
      const hoverBoundingRect = (
        dropRef.current as any
      ).getBoundingClientRect();

      const beforeDroppedItem =
        Math.abs(_clientOffset!.x - hoverBoundingRect.left) <
        hoverBoundingRect.width / 2;

      move(dragId, dropId, beforeDroppedItem);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      clientOffset: monitor.getClientOffset(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      itemType: monitor.getItemType(),
    }),
  });

  // hook with callback
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  drag(dragRef);
  drop(dropRef);

  // derived state
  let showLeftDropPositionIndicator = false;
  let showRightDropPositionIndicator = false;

  if (dropRef.current && clientOffset) {
    // todo: not as any
    const hoverBoundingRect = (dropRef.current as any).getBoundingClientRect();

    showLeftDropPositionIndicator =
      isOver &&
      Math.abs(clientOffset.x - hoverBoundingRect.left) <
        hoverBoundingRect.width / 2;
    showRightDropPositionIndicator =
      isOver &&
      Math.abs(clientOffset.x - hoverBoundingRect.left) >
        hoverBoundingRect.width / 2;
  }

  // jsx
  return (
    <Wrapper
      ref={dropRef}
      showLeftDropPositionIndicator={showLeftDropPositionIndicator}
      showRightDropPositionIndicator={showRightDropPositionIndicator}
    >
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
    </Wrapper>
  );
};

export default Field;
