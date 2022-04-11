import React from 'react'

const SelectImage = ({setFile, handleClick}) => {

    const demoImages = [
        {url: "images/group-business-people-working-office-1.jpg"},
        {url: "images/close-up-young-business-person-doing-internship.jpg"},
        {url: "images/two-business-partners-working-computer-office-2.jpg"},
      ]
    
  return (
                <div className="left">
                    <div className="addImage">
                            <label htmlFor="file" className="addImageContainer">
                                <img
                                className="addImg"
                                src="images/Add_Image_icon.png"
                                alt=""
                                />
                            </label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                id="file"
                                style={{ display: "none" }}
                                type="file"
                            />
                    </div>
                        <div className="demoImageLink">Or try with a demo image</div>
                        <div className="demoImages">

                        {demoImages.map((img, i) => (
                            <img
                                    key={i}
                                    className="demoImg"
                                    src={img.url}
                                    alt={`demoImg${i}`}
                                    onClick={(e)=>handleClick(e)}
                                />
                        )  )
                        }
                        </div>
                        </div>
    )
}

export default SelectImage

