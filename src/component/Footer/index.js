import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import Discord from "@mui/icons-material/Forum";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A1A1A",
        py: "100px",
        fontFamily: "Nohemi",
      }}
    >
      <Container>
        <Grid container>
          {/* Logo and Description Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box component="img" src="/images/footer-logo.png" alt="FANTV" sx={{ height: 36 }} />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "#FFFDD4" }}>
              The end-to-end platform for
              <br /> creators powered by AI
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFFDD480", fontSize: "0.875rem" }}>
              Crafted with ❤️ by Spacekayak
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFFDD480", fontSize: "0.875rem" }}>
              © 2024 FanTV. All rights reserved.
            </Typography>
          </Grid>

          {/* Company Section */}
          <Grid item xs={12} md={2} sx={{ fontFamily: "Nohemi", fontSize: "16px" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#FFFDD4", fontFamily: "Nohemi", fontSize: "16px" }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["Whitepaper", "Airdrop", "Privacy", "Terms & Conditions"].map((text) => (
                <Link
                  key={text}
                  href="#"
                  sx={{
                    color: "#FFFDD480",
                    fontWeight: "400",
                    fontSize: "16px",
                    fontFamily: "Nohemi",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Keep in touch Section */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#FFFDD4", fontFamily: "Nohemi", fontSize: "16px" }}
            >
              Keep in touch
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.6 }}>
              {[
                {
                  text: "Twitter",
                  icon: <TwitterIcon />,
                  link: "https://twitter.com/FanTV_official",
                },
                {
                  text: "Instagram",
                  icon: <InstagramIcon />,
                  link: "https://www.instagram.com/fantv.official/",
                },
                { text: "Telegram", icon: <TelegramIcon />, link: "https://t.me/FanTVDiscussions" },
                { text: "Discord", icon: <Discord />, link: "https://discord.gg/WTVgMFCceX" },
              ].map((item) => (
                <Link
                  key={item.text}
                  href={item?.link}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "#FFFDD480",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "400",
                    fontSize: "16px",
                    fontFamily: "Nohemi",

                    gap: 1,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {item.icon}
                  <Typography>{item.text}</Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
