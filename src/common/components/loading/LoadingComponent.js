import Image from "next/image";
import load from "src/assets/images/loadingbig.gif";

const Loadingcomponent = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={load} alt="Loading" width={100} height={100} />
      </div>
    </>
  );
};

export default Loadingcomponent;
