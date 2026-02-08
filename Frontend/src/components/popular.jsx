import Populardata from "./Data/popular.json";
function Popular() {
  return (
    <>
      {/* Popular Albums Section */}
      <h4 className="a">Popular albums</h4>
      <div className="d-flex h-scroll">
        {Populardata.map((album, i) => (
          <div className="card3" tabIndex={0} key={i}>
            <img src={album.img} alt="music" />
            <div className="play-btn">▶</div>
            <div className="info">{album.title}</div>
            {album.desc && <p className="rtr">{album.desc}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

export default Popular;
