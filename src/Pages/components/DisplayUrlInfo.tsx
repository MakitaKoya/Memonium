import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { formatDate } from "./CreateNewUrlInfoModal";

interface UrlInfoProps {
  title: string;
  url: string;
  date: Date;
  onDelete: () => void;
  onOpen: () => void;
}

export const DisplayUrlInfo: React.FC<UrlInfoProps> = ({
  title,
  url,
  date,
  onDelete,
  onOpen,
}) => {
  return (
    <Card margin="10px 5px">
      <CardHeader>
        <Stack
          spacing={3}
          direction="row"
          align="center"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <Heading size="md" width="85%">
            {title}
          </Heading>
          <Stack
            direction="row"
            align="center"
            spacing={3}
            style={{ position: "absolute", right: "0" }}
          >
            <EditIcon boxSize={5} onClick={onOpen} _hover={{ color: "blue" }} />
            <DeleteIcon
              boxSize={5}
              onClick={onDelete}
              _hover={{ color: "red" }}
            />
          </Stack>
        </Stack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size="xs">URL</Heading>
            <Text pt="2" fontSize="sm">
              {url}
            </Text>
          </Box>
          <Box>
            <Heading size="xs">最終アクセス日</Heading>
            <Text pt="2" fontSize="sm">
              {formatDate(date)}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
