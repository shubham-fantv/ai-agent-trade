import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Countdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      return { days, hours, minutes };
    }

    return { days: 0, hours: 0, minutes: 0 }; // Countdown has ended
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [endDate]);

  return (
    <div style={styles.container}>
      <img
        style={{ height: "36px", width: "36px", marginRight: "10px" }}
        src="/images/clockIcon.png"
      />
      <Typography variant="h2">
        {timeLeft.days}D {timeLeft.hours}HR {timeLeft.minutes}MIN
      </Typography>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#1E1E1E",
    fontSize: "48px",
    fontFamily: "Bricolage Grotesque",
    fontWeight: "800",
    textAlign: "center",
  },
  icon: {
    marginRight: "10px",
  },
  text: {
    color: "#1E1E1E",
    fontWeight: "800",
  },
};

export default Countdown;
