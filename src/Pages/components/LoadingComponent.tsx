import { Spinner, Heading } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <div
      style={{
        padding: "30vh 0 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="5px"
        speed="0.5s"
        emptyColor="gray"
        color="green"
        size="xl"
      />
      <Heading size="xl">Loading...</Heading>
    </div>
  );
};
