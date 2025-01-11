import { Heading, Divider, useDisclosure, Box } from "@chakra-ui/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// import { useNavigate } from "react-router-dom";
import { CreateNewUrlInfoModal } from "./components/CreateNewUrlInfoModal";
import { UrlInfoCard } from "./components/UrlInfoCard";
import { LoadingComponent } from "./components/LoadingComponent";
import { invoke } from "@tauri-apps/api/core";
import "../Styles/UrlCollectionPageStyles.css";
import { InitInfoCard } from "./components/InitInfoCard";
import { DeleteAlertDialog } from "./components/DeleteAlertDialog";

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
            className="scrollBox"
            width="100%"
            height="100%"
            margin="10px 0px"
            overflowY="scroll"
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
                <InitInfoCard />
              )
            ) : (
              <LoadingComponent />
            )}
          </Box>
          <DeleteAlertDialog
            isOpen={deleteCardModal.isOpen}
            onCloseCancel={() => {
              deleteCardModal.onClose();
            }}
            onCloseDelete={() => {
              deleteCard(deleteId);
              deleteCardModal.onClose();
            }}
          />
        </urlInfoContext.Provider>
      </InfoContext.Provider>
      {/* <Button onClick={clickNextPage}>Next Page</Button> */}
    </Box>
  );
};
