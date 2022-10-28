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
  index: number;
  move: (from: number, to: number) => void;
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
const Field: FC<FieldProps> = ({ title, index, move }) => {
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
        index,
      };
    },
  }));

  // drop
  const [{ clientOffset, isOver }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop(item, monitor) {
      // todo: not as any
      const dragIndex = (monitor.getItem() as any).index;
      const dropIndex = index;

      // Don't replace item with themselves
      if (dragIndex === dropIndex) {
        return;
      }

      // determine whether drop in front of target or behind the target
      const _clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = (
        dropRef.current as any
      ).getBoundingClientRect();

      const insertLeft =
        Math.abs(_clientOffset!.x - hoverBoundingRect.left) <
        hoverBoundingRect.width / 2;

      console.log({ insertLeft });

      if (insertLeft) {
        move(dragIndex, dropIndex);
        return;
      }

      move(dragIndex, dropIndex + 1);
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
    const hoverBoundingRect = (
      dropRef.current as HTMLDivElement
    ).getBoundingClientRect();

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
