import { FC } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Field from "./components/Field";
import { useFields } from "../../hooks/UseFields";
import type { FieldType } from "../../hooks/UseFields";

interface EditFieldsViewProps {}

const EditFieldsView: FC<EditFieldsViewProps> = () => {
  const [fields, move] = useFields();

  const renderFields = (items: FieldType[]) => {
    return items.map((item, index) => {
      return (
        <Grid key={item.id} xs={4}>
          <Field {...item} index={index} move={move} />
        </Grid>
      );
    });
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Grid container spacing={2}>
          {renderFields(fields)}
        </Grid>
      </Box>
    </Container>
  );
};

export default EditFieldsView;
