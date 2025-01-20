import { Box, Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Banner from "../src/component/banner";

const Index = () => {
  return (
    <div>
      <Box sx={{ width: "100%", height: "auto" }}>
        <Container
          sx={{
            maxWidth: "1296px",
            width: "auto",
            marginTop: "90px",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
          }}
          maxWidth={false}
        >
          <Banner />
        </Container>
      </Box>
    </div>
  );
};

export default Index;
