import {
  Heading,
  Text,
  Divider,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
} from "@chakra-ui/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
// import { useNavigate } from "react-router-dom";
import { CreateNewUrlInfoModal } from "./components/CreateNewUrlInfoModal";
import { UrlInfoCard } from "./components/UrlInfoCard";
import { LoadingComponent } from "./components/LoadingComponent";
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
    informations: urlInfoContextType[];
    setinformations: Dispatch<SetStateAction<urlInfoContextType[]>>;
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

  const [informations, setinformations] = useState<urlInfoContextType[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 起動時にデータを読み込む
    invoke("path_watch");
    invoke<urlInfoContextType[]>("load_data").then((data) => {
      const parsedData = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setinformations(parsedData);
      setIsDataLoaded(true);
    });
  }, []);

  // データをセーブ
  useEffect(() => {
    if (isDataLoaded) {
      const stringifiedData = informations.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      }));
      invoke("save_data", { data: stringifiedData });
    }
  }, [informations]);

  // クリエイトモーダルオプション
  const createCardModal = useDisclosure();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // デリートモーダルオプション
  const deleteCardModal = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [deleteId, setDeleteId] = useState<number>(0);

  // ページルーティング
  // const navigate = useNavigate();
  // const clickNextPage = () => {
  //   navigate("/TestCard");
  // };

  // カードの削除
  const deleteCard = (id: number) => {
    setinformations(informations.filter((info) => info.id !== id));
  };

  // カード編集時の情報セット
  const urlInfoSetter = (id: number) => {
    const info = informations.find((item) => item.id === id);
    if (info) {
      setUrlInfo(info);
    } else {
      setIsEdit(false);
    }
  };

  // Page Style CSS
  const scrollBoxStyle = {
    "&::-webkit-scrollbar": { display: "none" },
    "-ms-overflow-style": "none", // Internet Explorer 10+
    "scrollbar-width": "none", // Firefox
  };

  return (
    <Box className="container" overflow="hidden">
      <InfoContext.Provider value={{ informations, setinformations }}>
        <urlInfoContext.Provider value={{ urlInfo, setUrlInfo }}>
          <Heading size="xl">URLコレクション</Heading>
          <Divider style={{ margin: "10px 0" }} />
          <CreateNewUrlInfoModal
            isOpen={createCardModal.isOpen}
            onOpen={createCardModal.onOpen}
            onClose={() => {
              setIsEdit(false);
              createCardModal.onClose();
            }}
            isEdit={isEdit}
          />
          <Box
            width="100%"
            height="100%"
            margin="10px 0px"
            overflowY="scroll"
            css={scrollBoxStyle}
          >
            {isDataLoaded ? (
              informations.length !== 0 ? (
                informations.map((info) => (
                  <div key={info.id}>
                    <UrlInfoCard
                      title={info.title}
                      url={info.url}
                      date={info.date}
                      onDelete={() => {
                        setDeleteId(info.id);
                        deleteCardModal.onOpen();
                      }}
                      onOpen={() => {
                        urlInfoSetter(info.id);
                        setIsEdit(!isEdit);
                        createCardModal.onOpen();
                      }}
                    />
                  </div>
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
              )
            ) : (
              <LoadingComponent />
            )}
          </Box>
          <AlertDialog
            isOpen={deleteCardModal.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={deleteCardModal.onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader>警告</AlertDialogHeader>
                <AlertDialogBody>
                  完全に削除しますか？
                  <br />
                  この操作は元に戻すことができません。
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={deleteCardModal.onClose}>
                    キャンセル
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      deleteCard(deleteId);
                      deleteCardModal.onClose();
                    }}
                    ml={3}
                  >
                    削除
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </urlInfoContext.Provider>
      </InfoContext.Provider>
      {/* <Button onClick={clickNextPage}>Next Page</Button> */}
    </Box>
  );
};
