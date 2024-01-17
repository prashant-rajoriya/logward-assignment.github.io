import React, { useState } from "react";
import { Button, Card, Col, Row, Space } from "antd";
import EditComment from "../CommentForm/edit";
import { ActionType, CommentType, StateType } from "../useReducer";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import ReplyComment from "../CommentForm/reply";

interface CommentProps {
  comment: CommentType;
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}

const Comment: React.FC<CommentProps> = ({ comment, dispatch, state }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const onSave = (values: { comment: string }) => {
    dispatch({
      type: "EDIT_COMMENT",
      payload: {
        ...state[comment.id],
        comment: values.comment,
        updated_at: new Date(),
      },
    });
    setIsEditing(false);
  };
  const onCancel = () => {
    setIsReplying(false);
  };

  return (
    <>
      <Card
        style={{
          marginTop: 12,
          position: "relative",
          backgroundColor: "rgb(246, 246, 246)",
        }}
      >
        {isEditing ? (
          <EditComment comment={comment} onSave={onSave} />
        ) : (
          <Row>
            <Col span={24}>
              <Row justify={"space-between"}>
                <Col>
                  <h3>{comment.name}</h3>
                </Col>
                <Col>
                  <p>
                    {moment(comment.created_at).clone().format("Do MMM YYYY")}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>{comment.comment}</Col>
              </Row>
              <Space>
                <Button
                  type={"link"}
                  onClick={() => setIsReplying((prev) => !prev)}
                >
                  {isReplying ? "Cancel Reply" : "Reply"}
                </Button>
                <Button type={"link"} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </Space>
            </Col>
          </Row>
        )}
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          danger
          style={{
            position: "absolute",
            top: "40%",
            right: -16,
          }}
          onClick={() => {
            dispatch({ type: "DELETE_COMMENT", payload: comment.id });
          }}
        />
      </Card>
      {isReplying && (
        <Row>
          <Col push={4} span={20}>
            <ReplyComment
              onCancel={onCancel}
              dispatch={dispatch}
              parentId={comment.id}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col push={4} span={20}>
          {Array.from(comment.child).map((childId) => (
            <Comment
              key={childId}
              comment={state[childId]}
              state={state}
              dispatch={dispatch}
            />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Comment;
