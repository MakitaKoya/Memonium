import { Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const pageStyle = { padding: "200px" };
  const navigate = useNavigate();

  const clickNextPage = () => {
    navigate("/UrlCollectionPage");
  };
  return (
    <div style={pageStyle} onClick={clickNextPage}>
      <Heading size="4xl">Memonium</Heading>
      <Text style={{ margin: "100px 0" }}>Click to Start</Text>
    </div>
  );
};
