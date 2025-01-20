import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const useIsMobile = (value, queryInput = "(max-width:768px)") => {
  const [isMobile, setIsMobile] = useState(!!value);

  const isResponsiveMobile = useMediaQuery(queryInput, { noSsr: true });

  useEffect(() => {
    setIsMobile(isResponsiveMobile);
  }, [isResponsiveMobile]);

  return isMobile;
};

export default useIsMobile;
