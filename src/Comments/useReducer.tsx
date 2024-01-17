import { useEffect, useReducer } from "react";

export type CommentType = {
  id: number;
  name: string;
  comment: string;
  editing: boolean;
  created_at: Date;
  updated_at: Date;
  parentId: number | null;
  child: Set<number>;
};

export type StateType = Record<number, CommentType>;

export type ActionType =
  | { type: "ADD_COMMENT"; payload: CommentType }
  | { type: "EDIT_COMMENT"; payload: CommentType }
  | { type: "DELETE_COMMENT"; payload: number }
  | { type: "SORT_COMMENTS_ASCENDING" }
  | { type: "SORT_COMMENTS_DESCENDING" };

function deleteRecursive(state: StateType, commentId: number): StateType {
  const newState = { ...state };
  const comment = newState[commentId];
  Array.from(comment?.child).forEach((childId: number) => {
    deleteRecursive(newState, childId);
  });
  newState[comment.parentId || 0]?.child.delete(commentId);
  delete newState[commentId];
  return newState;
}

function reducer(state: StateType, action: ActionType): StateType {
  let newState: StateType;
  let newComment: CommentType;

  switch (action.type) {
    case "ADD_COMMENT":
      newComment = { ...action.payload, child: new Set<number>() };
      if (newComment.parentId !== null) {
        // It's a reply, update the parent comment's child array
        newState = { ...state };
        newState[newComment.parentId].child.add(newComment.id);
        return { ...newState, [newComment.id]: newComment };
      }
      return { ...state, [newComment.id]: newComment };

    case "EDIT_COMMENT":
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload },
      };

    case "DELETE_COMMENT":
      return deleteRecursive(state, action.payload);

    case "SORT_COMMENTS_ASCENDING":
      newState = { ...state };
      return Object.fromEntries(
        Object.entries(newState).sort(
          (a, b) =>
            new Date(a[1].created_at).getTime() -
            new Date(b[1].created_at).getTime()
        )
      );

    case "SORT_COMMENTS_DESCENDING":
      newState = { ...state };
      return Object.fromEntries(
        Object.entries(newState).sort(
          (a, b) =>
            new Date(b[1].created_at).getTime() -
            new Date(a[1].created_at).getTime()
        )
      );

    default:
      return state;
  }
}

const initialState: StateType = {};

function useCommentReducer() {
  // TODO: Use state and dispatch in your component
  // Define a key for storing your state in local storage
  const localStorageKey = "commentsState";

  // Function to load the state from local storage
  const loadState = () => {
    try {
      const serializedState = localStorage.getItem(localStorageKey);
      return serializedState ? JSON.parse(serializedState) : initialState;
    } catch (err) {
      return initialState;
    }
  };

  // Use loadState to initialize the state
  const [state, dispatch] = useReducer(reducer, loadState());

  // Use useEffect to save the state to local storage whenever it changes
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(localStorageKey, serializedState);
    } catch (err) {
      // Handle write errors or log them
      console.error("Failed to save state to local storage:", err);
    }
  }, [state]);
  return { state, dispatch };
}

export default useCommentReducer;
