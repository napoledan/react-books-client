import React from "react";
import LoaderImg from "../../../public/eclipse-loader-spinner.svg";
import "./Loader.css";

function Loader() {
    //return Loader element for dynamic loading
    return (
      <div className="loader flex flex-c">
        <img src={LoaderImg} alt="loader" />
        </div>
    );
  }
  
  export default Loader;
  