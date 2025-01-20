import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./styles";
import TextReveal from "../TextRevel";

const Banner = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();

      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Video autoplay failed:", error);
        }
      };

      video.addEventListener("loadedmetadata", playVideo);

      const handleUserInteraction = () => {
        playVideo();
        document.removeEventListener("touchstart", handleUserInteraction);
      };

      document.addEventListener("touchstart", handleUserInteraction);

      return () => {
        video.removeEventListener("loadedmetadata", playVideo);
        document.removeEventListener("touchstart", handleUserInteraction);
      };
    }
  }, []);

  return (
    <div>
      <Box sx={{ ...styles.landingPage }}>
        <Container sx={styles.containerStyle} maxWidth={false}>
          <Box sx={styles.mainPage}>
            <Box sx={styles.middleSection}>
              <Box
                sx={styles.middleLeftSection}
                className="animate__animated animate__fadeInLeft animate__delay-0.3s"
              >
                <Box sx={{ display: "block" }}>
                  {isMobile ? (
                    <>
                      <TextReveal delay={0.5}>
                        <Typography variant="h1">10 Mn </Typography>
                        <Typography variant="h1">$fAN IN</Typography>
                        <Typography variant="h1">Rewards </Typography>
                      </TextReveal>
                    </>
                  ) : (
                    <>
                      <TextReveal delay={0.5}>
                        <Typography variant="h1"> Nation state for AI</Typography>
                      </TextReveal>
                      <TextReveal delay={0.8}>
                        <Typography variant="h1">AGents</Typography>
                      </TextReveal>
                    </>
                  )}
                </Box>
              </Box>

              <Box sx={styles.middleRightSection}>
                <p>images</p>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Banner;
