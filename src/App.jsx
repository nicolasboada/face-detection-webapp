import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./app.css";
import MenuOptions from "./components/MenuOptions";
import NewImage from "./components/NewImage";
import SelectImage from "./components/SelectImage";
// import Navbar from "./components/Navbar";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const [scoreThreshold, setScoreThreshold] = useState(0.5)
  const [inputSize, setInputSize] = useState(512)
  const [expressionToggle, setExpressionToggle] = useState(true)
  const [ageToggle, setAgeToggle] = useState(true)
  const [genderToggle, setGenderToggle] = useState(true)
  const [loading, setLoading] = useState(true);

  const wrapperRef = useRef();

  const saveImage = async () => {
    if (!image)  { 
      toast.error("Nothing to save, make sure to select and image first!");
      return;
    }
    let savingToast = toast.loading("Exporting image...");
    domtoimage
      .toPng(wrapperRef.current)
      .then(async (data) => {
          domtoimage
          .toPng(wrapperRef.current)
          .then(async(data) => {
            var a = document.createElement("A");
            a.href = data;
            a.download = `facedetection-${new Date().toISOString()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success("Image exported!", { id: savingToast });
          });
      });
  };

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src
        });
      };
    };

    file && getImage();
  }, [file]);

  const handleClick = (e) => {
    const img = new Image();
    img.src = e.target.src;
    img.onload = () => {
        setImage({url: img.src});
      };
    };

  return (
    <div className="main">
      {/* <Navbar /> */}
      <div className="container">
        {image ? (
          <NewImage
          image={image}
          setImage={setImage}
          scoreThreshold={scoreThreshold}
          inputSize={inputSize}
          expressionToggle={expressionToggle}
          ageToggle={ageToggle}
          genderToggle={genderToggle}
          wrapperRef={wrapperRef}
          loading={loading}
          setLoading={setLoading}
          />
          ) : (
          <SelectImage setFile={setFile} handleClick={handleClick}/>
          )}
        <MenuOptions
          scoreThreshold={scoreThreshold}
          setScoreThreshold={setScoreThreshold}
          inputSize={inputSize}
          setInputSize={setInputSize}
          expressionToggle={expressionToggle}
          setExpressionToggle={setExpressionToggle}
          ageToggle={ageToggle}
          setAgeToggle={setAgeToggle}
          genderToggle={genderToggle}
          setGenderToggle={setGenderToggle}
          saveImage={saveImage}
          loading={loading}
          />
          <Toaster />
      </div>
    </div>
  );
}

export default App;
