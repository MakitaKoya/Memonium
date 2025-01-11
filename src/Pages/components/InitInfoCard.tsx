import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

export const InitInfoCard = () => {
  return (
    <Card margin="10px 5px">
      <CardHeader>
        <Heading size="md">まだ何もありません</Heading>
      </CardHeader>
      <CardBody>
        <Text pt="2" fontSize="sm">
          右上の「追加」ボタンから検索結果を保存してみよう！
        </Text>
      </CardBody>
    </Card>
  );
};
