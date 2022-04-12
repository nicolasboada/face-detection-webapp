import { useEffect, useRef} from "react";
import * as faceapi from "face-api.js";
import { CircularProgress } from "@mui/material";
import { useDebounce } from "./useDebounce";

const NewImage = ( {image,setImage,scoreThreshold,inputSize,expressionToggle,ageToggle,genderToggle,wrapperRef,loading,setLoading} ) => {
  const { url } = image;

  const debouncedscoreThreshold = useDebounce(scoreThreshold, 1000);
  const debouncedinputSize = useDebounce(inputSize, 1000);

  let boxBackgroundColor = 'rgba(0, 0, 0, 0.5)';
  !expressionToggle && !ageToggle && !genderToggle && (boxBackgroundColor = 'rgba(0, 0, 0, 0)')

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions({ scoreThreshold: scoreThreshold, inputSize: inputSize })
      
    ).withAgeAndGender().withFaceExpressions();

    setLoading(false);

    const displaySize = { width: imgRef.current.width, height: imgRef.current.height };
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current,displaySize);
    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

    resizedDetections.forEach(result => {
      const { age, gender, genderProbability, expressions } = result

      const field = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
      const score = expressions[field];
      const mainExpression = (`${field} (${score.toFixed(2)})`);

      new faceapi.draw.DrawTextField(
        [
          {text:mainExpression, show: expressionToggle},
          {text:`${faceapi.utils.round(age, 0)} years`, show: ageToggle},
          {text:`${gender} (${faceapi.utils.round(genderProbability)})`, show: genderToggle}
        ].filter(field => field.show).map(field => field.text),
        {x: result.detection.box.bottomLeft._x, y: (result.detection.box.bottomLeft._y)},
        {
          padding: 0,
          backgroundColor: boxBackgroundColor
        }
      ).draw(canvasRef.current)
    })
  };

  useEffect(() => {
    const loadModels = () => {
      setLoading(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && canvasRef.current && loadModels();
    // eslint-disable-next-line
  }, [debouncedscoreThreshold, debouncedinputSize, ageToggle, genderToggle, expressionToggle]);

  return (
      <div className="left" >

        <div className="imageContainer" ref={(el) => (wrapperRef.current = el)}>

          {loading ? <span className="CircularProgress"> 
          <CircularProgress />
          </span> : <></>}
          
          <img className="selectedImage" ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
          <canvas ref={canvasRef} />

        </div>

        <div className="reset" onClick={()=>setImage()}>
          <span>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11C20.4 11 20 11.4 20 12C20 14.9 18.5 17.5 16 18.9C12.2 21.1 7.3 19.8 5.1 16C2.9 12.2 4.2 7.3 8 5.1C11.3 3.2 15.3 3.9 17.8 6.5H15.4C14.8 6.5 14.4 6.9 14.4 7.5C14.4 8.1 14.8 8.5 15.4 8.5H19.9C20.5 8.5 20.9 8.1 20.9 7.5V3C20.9 2.4 20.5 2 19.9 2C19.3 2 18.9 2.4 18.9 3V4.8C17 3 14.6 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 11.4 21.6 11 21 11Z"></path></svg>
          </span>
          reset
        </div>

      </div>
  );
};

export default NewImage;
