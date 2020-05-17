import React from "react";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();
  console.log(history);
  return (
    <div className="success-container">
      <h1>Congrats! Pizza is on its way!</h1>
      {
        // console.log("post.length: ", post.length)
        history.post ? <pre>{JSON.stringify(history.post, null, 2)}</pre> : null
      }
    </div>
  );
};

export default Success;
