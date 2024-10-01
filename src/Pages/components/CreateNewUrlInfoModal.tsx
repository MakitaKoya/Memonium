import React, { useContext, useState, useEffect } from "react";
import {
  InfoContext,
  urlInfoContext,
  urlInfoContextType,
} from "../UrlCollectionPage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
} from "@chakra-ui/react";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const manth = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${manth}/${day}`;
};

const schema = z.object({
  title: z.string().min(1, { message: "1文字以上で入力してください" }),
  url: z
    .string()
    .url({ message: "URLの形式で入力してください" })
    .min(1, { message: "1文字以上で入力してください" }),
});
type Inputs = z.infer<typeof schema>;

interface CreateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isEdit: boolean;
}

export const CreateNewUrlInfoModal: React.FC<CreateModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  isEdit,
}) => {
  // context
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const urlInfo = useContext(urlInfoContext).urlInfo;
  const { infomations, setInfomations } = useContext(InfoContext);

  // フォーム初期化
  useEffect(() => {
    if (isOpen) {
      if (isEdit) {
        setId(urlInfo.id);
        setTitle(urlInfo.title);
        setUrl(urlInfo.url);
        setDate(urlInfo.date);
      } else {
        setTitle("");
        setUrl("");
        setDate(new Date());
      }
    }
  }, [isOpen]);

  // 日付データのセット
  const nowDateSetter = () => {
    setDate(new Date());
  };
  const dateSetter = (year: number, manth: number, day: number) => {
    setDate(new Date(year, manth, day));
  };

  // モーダルウィンドウの追加ボタンを押したとき
  const clickAddButton = () => {
    const newInfo: urlInfoContextType = {
      id: Date.now(),
      title: title,
      url,
      date,
    };
    setInfomations([...infomations, newInfo]);
    onClose();
  };

  const clickEditButton = () => {
    const editInfo: urlInfoContextType = {
      id,
      title: title,
      url,
      date,
    };
    setInfomations(
      infomations.map((info) =>
        info.id === editInfo.id
          ? {
              ...info,
              title: editInfo.title,
              url: editInfo.url,
              date: editInfo.date,
            }
          : info
      )
    );
    onClose();
  };

  // バリデーション
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched", resolver: zodResolver(schema) });

  // Page Style CSS
  const containerStyle = { display: "flex", justifyContent: "flex-end" };
  const buttonStyle = { margin: "1px" };
  const formStyle = { padding: "20px 5px" };
  const formTitleWidth = "40%";

  return (
    <>
      <Box style={containerStyle}>
        <Button style={buttonStyle} onClick={onOpen}>
          追加
        </Button>
      </Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <form
          onSubmit={handleSubmit(isEdit ? clickEditButton : clickAddButton)}
        >
          <ModalContent>
            <ModalHeader>
              {isEdit ? "URLを編集" : "新しいURLを追加"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box style={formStyle}>
                <Stack spacing={2} direction="row" align="center">
                  <Heading size="sm" width={formTitleWidth}>
                    タイトル:
                  </Heading>
                  <Input
                    type="text"
                    value={title}
                    {...register("title")}
                    placeholder="ページタイトルを入力してください"
                    isInvalid={!!errors.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const text = e.target.value;
                      setTitle(text);
                    }}
                  />
                </Stack>
                {errors.title && (
                  <Text color="red" margin="3px 0 -25px 31%">
                    {errors.title.message}
                  </Text>
                )}
              </Box>
              <Box style={formStyle}>
                <Stack spacing={2} direction="row" align="center">
                  <Heading size="sm" width={formTitleWidth}>
                    URL:
                  </Heading>
                  <Input
                    type="url"
                    value={url}
                    {...register("url")}
                    placeholder="ページのURLを入力してください"
                    isInvalid={!!errors.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const text = e.target.value;
                      setUrl(text);
                    }}
                  />
                </Stack>
                {errors.url && (
                  <Text color="red" margin="3px 0 -25px 31%">
                    {errors.url.message}
                  </Text>
                )}
              </Box>
              <Box style={formStyle}>
                <Stack spacing={200} direction="row" align="center">
                  <Heading size="sm" width={formTitleWidth}>
                    最終アクセス日:
                  </Heading>
                  <Button onClick={nowDateSetter}>
                    {formatDate(new Date())}
                  </Button>
                </Stack>

                <Stack spacing={2} direction="row" align="center" margin="10px">
                  <NumberInput
                    value={date.getFullYear()}
                    min={1995}
                    max={2100}
                    onChange={(valueString) =>
                      dateSetter(
                        valueString as unknown as number,
                        date.getMonth(),
                        date.getDate()
                      )
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text>年</Text>
                  <Select
                    value={date.getMonth() + 1}
                    width={300}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      if (value !== "00") {
                        const numberValue: number = parseInt(value, 10);
                        dateSetter(
                          date.getFullYear(),
                          numberValue - 1,
                          date.getDate()
                        );
                      }
                    }}
                  >
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Select>
                  <Text>月</Text>
                  <Select
                    value={date.getDate()}
                    width={300}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      if (value !== "00") {
                        const numberValue: number = parseInt(value, 10);
                        dateSetter(
                          date.getFullYear(),
                          date.getMonth(),
                          numberValue
                        );
                      }
                    }}
                  >
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </Select>
                  <Text>日</Text>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" mr={3}>
                {isEdit ? "完了" : "作成"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
