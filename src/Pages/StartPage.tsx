import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../Styles/StartPageStyles.css";

export const StartPage = () => {
  const navigate = useNavigate();

  const clickNextPage = () => {
    navigate("/UrlCollectionPage");
  };
  return (
    <div className="container" onClick={clickNextPage}>
      <Box className="box">
        <Heading size="4xl">Memonium</Heading>
      </Box>
      <Box className="box">
        <Text>Click to Start</Text>
      </Box>
    </div>
  );
};
