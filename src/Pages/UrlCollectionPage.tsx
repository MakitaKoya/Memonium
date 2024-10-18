import {
  Heading,
  Text,
  Divider,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// import { useNavigate } from "react-router-dom";
import { CreateNewUrlInfoModal } from "./components/CreateNewUrlInfoModal";
import { DisplayUrlInfo } from "./components/DisplayUrlInfo";
import { invoke } from "@tauri-apps/api/core";
import "../Styles/UrlCollectionPageStyles.css";

// Context
export interface urlInfoContextType {
  id: number;
  title: string;
  url: string;
  date: Date;
}

export const urlInfoContext = createContext(
  {} as {
    urlInfo: urlInfoContextType;
    setUrlInfo: Dispatch<SetStateAction<urlInfoContextType>>;
  }
);

export const InfoContext = createContext(
  {} as {
    infomations: urlInfoContextType[];
    setInfomations: Dispatch<SetStateAction<urlInfoContextType[]>>;
  }
);

export const UrlCollectionPage: React.FC = () => {
  // Context
  const [urlInfo, setUrlInfo] = useState<urlInfoContextType>({
    id: 0,
    title: "",
    url: "",
    date: new Date(),
  });

  const [infomations, setInfomations] = useState<urlInfoContextType[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 起動時にデータを読み込む
    invoke("path_watch");
    invoke<urlInfoContextType[]>("load_data").then((data) => {
      const parsedData = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setInfomations(parsedData);
      setIsDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      const stringifiedData = infomations.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      }));
      invoke("save_data", { data: stringifiedData });
    }
  }, [infomations]);

  // モーダルオプション
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // ページルーティング
  // const navigate = useNavigate();
  // const clickNextPage = () => {
  //   navigate("/TestCard");
  // };

  // カードの削除
  const deleteCard = (id: number) => {
    setInfomations(infomations.filter((info) => info.id !== id));
  };

  // カード編集時の情報セット
  const urlInfoSetter = (id: number) => {
    const info = infomations.find((item) => item.id === id);
    if (info) {
      setUrlInfo(info);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <div className="container">
      <InfoContext.Provider value={{ infomations, setInfomations }}>
        <urlInfoContext.Provider value={{ urlInfo, setUrlInfo }}>
          <Heading size="xl">URLコレクション</Heading>
          <Divider style={{ margin: "10px 0" }} />
          <CreateNewUrlInfoModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={() => {
              setIsEdit(false);
              onClose();
            }}
            isEdit={isEdit}
          />
          {infomations.length !== 0 ? (
            infomations.map((info) => (
              <DisplayUrlInfo
                key={info.id}
                title={info.title}
                url={info.url}
                date={info.date}
                onDelete={() => deleteCard(info.id)}
                onOpen={() => {
                  urlInfoSetter(info.id);
                  setIsEdit(!isEdit);
                  onOpen();
                }}
              />
            ))
          ) : (
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
          )}
        </urlInfoContext.Provider>
      </InfoContext.Provider>
      {/* <Button onClick={clickNextPage}>Next Page</Button> */}
    </div>
  );
};
