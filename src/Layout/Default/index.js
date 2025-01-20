import { Box } from "@mui/system";
import { memo } from "react";
import styles from "./styles";
import RevampFooter from "../../component/Footer";
import RevampHeader from "../../component/Header";

const DefaultLayout = ({ children, customStyles = {} }) => {
  return (
    <Box sx={{ ...styles.wrapper, ...customStyles.wrapper }}>
      <RevampHeader />
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
      <RevampFooter />
    </Box>
  );
};

export default memo(DefaultLayout);
