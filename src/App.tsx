import { Card } from "antd";
import "./App.css";
import { Comments } from "./Comments";

function App() {
  return (
    <Card bordered={false}>
      <Comments />
    </Card>
  );
}

export default App;
