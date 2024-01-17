import React, { useState } from "react";
import { ActionType } from "../useReducer";
import { Button, Flex, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface CommentSorterProps {
  dispatch: React.Dispatch<ActionType>;
}

export const CommentSorter = ({ dispatch }: CommentSorterProps) => {
  const [asc, setAsc] = useState(true);
  return (
    <Flex align="center">
      <Typography.Text>Sort By: </Typography.Text>
      <Button
        type="text"
        onClick={() => {
          setAsc(!asc);
          dispatch({
            type: asc ? "SORT_COMMENTS_ASCENDING" : "SORT_COMMENTS_DESCENDING",
          });
        }}
        icon={asc ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
      >
        Date and Time
      </Button>
    </Flex>
  );
};
