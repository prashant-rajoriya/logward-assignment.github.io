// CreateComment.tsx
import React from "react";
import { Button, Card, Form, Input, Row } from "antd";
import { ActionType } from "../useReducer";

interface CreateCommentProps {
  dispatch: React.Dispatch<ActionType>;
}

const CreateComment: React.FC<CreateCommentProps> = ({ dispatch }) => {
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
        parentId: null,
        child: new Set<number>(),
      },
    });
    form.resetFields();
  };

  return (
    <Card style={{ backgroundColor: "rgb(246, 246, 246)" }}>
      <h2>Comment</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="comment" rules={[{ required: true }]}>
          <Input.TextArea placeholder="Comment" />
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

export default CreateComment;
