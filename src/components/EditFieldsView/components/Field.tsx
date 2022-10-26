import React, { FC } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  title: String;
};

const Field: FC<Props> = ({ title = "字段" }) => {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>
        <DragIndicatorIcon />
      </Button>
      <Button>{title}</Button>
      <Button>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  );
};

export default Field;
