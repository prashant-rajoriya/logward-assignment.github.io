import { Flex } from "antd";
import useCommentReducer from "./useReducer";
import CreateComment from "./CommentForm/create";
import Comment from "./Comment";
import { CommentSorter } from "./CommentSorter";

export const Comments = () => {
  const { state, dispatch } = useCommentReducer();
  return (
    <Flex vertical>
      <CreateComment dispatch={dispatch} />
      <Flex justify={"end"} align={"middle"}>
        <CommentSorter dispatch={dispatch} />
      </Flex>
      {Object.values(state).map(
        (comment, index) =>
          comment.parentId === null && (
            <Comment
              key={`${comment.id}-${index}`}
              comment={comment}
              state={state}
              dispatch={dispatch}
            />
          )
      )}
    </Flex>
  );
};
