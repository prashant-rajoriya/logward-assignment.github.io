// ReplyComment.tsx
import React from "react";
import { Button, Card, Form, Input, Row } from "antd";
import { ActionType } from "../useReducer";

interface ReplyCommentProps {
  dispatch: React.Dispatch<ActionType>;
  parentId: number;
  onCancel: () => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
  dispatch,
  parentId,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values: { comment: string; name: string }) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        id: Date.now(),
        name: values.name,
        comment: values.comment,
        editing: false,
        created_at: new Date(),
        updated_at: new Date(),
        parentId: parentId,
        child: new Set<number>(),
      },
    });
    form.resetFields();
    onCancel();
  };

  return (
    <Card style={{ marginTop: 12, backgroundColor: "rgb(246, 246, 246)" }}>
      <h2>Reply</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="comment" rules={[{ required: true }]}>
          <Input.TextArea placeholder="Reply" />
        </Form.Item>
        <Form.Item>
          <Row justify={"end"}>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReplyComment;
