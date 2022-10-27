import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Field from "./components/Field";

interface EditFieldsViewProps {}

const EditFieldsView: FC<EditFieldsViewProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Field title={"产品名称"} />
        </Grid>
        <Grid xs={4}>
          <Field title={"产品类别"} />
        </Grid>
        <Grid xs={4}>
          <Field title={"产品价格"} />
        </Grid>
        <Grid xs={4}>
          <Field title={"产品销量"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditFieldsView;
