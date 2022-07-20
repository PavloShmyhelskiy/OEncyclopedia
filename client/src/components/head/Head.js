import { Link } from "react-router-dom";

const Head = ({ email }) => {
  return (
    <>
      <div className="flex flex-row-reverse ">
        <div className="flex w-96 self-end justify-between border-2 mr-0">
          { email ? 
              <>
                <div> { email } </div>
                <Link to="/logout" >log out</Link>
              </>
            :
              <>
                <Link to="/login" >log in</Link>
                <Link to="/register" >regestration</Link>
              </>
          }
        </div>
      </div>
    </>
  );
}

export default Head;
