import { useState } from "react";

export default function Image({ src, alt, className, style, icon }) {

    const [imageError, setImageError] = useState(false);
    // const propStyle = style ? style : {}

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        imageError ?
            <div className={className} style={style} >
                {icon &&
                    <div className="d-flex align-items-center justify-content-center h-100">
                        {icon()}
                    </div>
                }
            </div>
            :
            <img
                src={src}
                alt={alt}
                className={className}
                onError={handleImageError}
                style={style}
            />
    );
}
