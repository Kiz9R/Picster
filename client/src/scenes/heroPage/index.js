import React from "react";
import HeroV from "assets/HeroV.mp4";
// import VideoInterval from "./VideoInterval";
import { Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./hero.css";

const HeroPage = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <div className="main">
      <video src={HeroV} autoPlay loop muted />
      {/* <VideoInterval /> */}
      <div className="overlay"></div>
      <div className="content">
        <div width={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto">
          <Typography
            // fontFamily="monospace"
            textTransform="uppercase"
            fontWeight="500"
            fontSize="3rem"
            textAlign="center"
            variant="h5"
            letterSpacing="0.2rem"
            color="#222"
            sx={{ mb: "1.5rem", color: "#fff" }}
          >
            Snap Share Smile
          </Typography>
          <div className="buttonJoin">
            <Button
              width="3rem"
              type="submit"
              onClick={() => navigate("/login")}
              sx={{
                fontSize: "1rem",
                fontWeight: "700",
                letterSpacing: "0.2rem",
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: "#fff",
                "&:hover": {
                  color: palette.primary.light,
                  backgroundColor: "#fff",
                },
              }}
            >
              PICSTER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
