import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import "../Styles/StartPageStyles.css";
import { useEffect, useState } from "react";

export const StartPage = () => {
  const [version, setVersion] = useState<string>("0.0.0");

  useEffect(() => {
    invoke<string>("get_version").then((data) => {
      console.log(data);
      setVersion(data);
    });
  }, []);

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
      <Box className="version">
        <Text>Version. {version}</Text>
      </Box>
    </div>
  );
};
