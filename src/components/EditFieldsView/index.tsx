import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useCallback } from "react";
import Field from "./components/Field";
import { useFields } from "../../hooks/UseFields";

import type { FC } from "react";
import type { FieldType } from "../../hooks/UseFields";

interface EditFieldsViewProps {}

const EditFieldsView: FC<EditFieldsViewProps> = () => {
  const [fields, move] = useFields();

  const renderField = useCallback((item: FieldType) => {
    return (
      <Grid key={item.id} xs={4}>
        <Field {...item} move={move} />
      </Grid>
    );
  }, []);

  return (
    <Container maxWidth="lg">
      <Box>
        <Grid container spacing={2}>
          {fields.map((field) => renderField(field))}
        </Grid>
      </Box>
    </Container>
  );
};

export default EditFieldsView;
