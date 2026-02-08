import Charts from "./Charts";
import Sidebar from "./Sidebar";

function Songs() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 colol ">
            <Sidebar />
          </div>

          <div className="col-10">
            <Charts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Songs;
