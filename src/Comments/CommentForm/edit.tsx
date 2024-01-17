// EditComment.tsx
import React from "react";
import { Button, Form, Input } from "antd";
import { CommentType } from "../useReducer";

interface EditCommentProps {
  comment: CommentType;
  onSave: (values: { comment: string }) => void;
}

const EditComment: React.FC<EditCommentProps> = ({ comment, onSave }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { comment: string }) => {
    onSave(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name={`edit-comment-${comment.id}`}
      onFinish={onFinish}
      initialValues={{ comment: comment.comment }}
    >
      <Form.Item name="comment" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Reply" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditComment;
