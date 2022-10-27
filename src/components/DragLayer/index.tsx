import { FC } from "react";
import { useDragLayer } from "react-dnd";
import type { XYCoord } from "react-dnd";
import styled from "styled-components";

type DragLayerProps = {};

const Wrapper = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  mouseOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return { display: "none" };
  }

  const { x, y } = mouseOffset || { x: 0, y: 0 };
  // TODO adjust
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

const DragLayer: FC<DragLayerProps> = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
    mouseOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    mouseOffset: monitor.getClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <Wrapper>
      <div style={getItemStyles(initialOffset, currentOffset, mouseOffset)}>
        DragLayer
      </div>
    </Wrapper>
  );
};

export default DragLayer;
