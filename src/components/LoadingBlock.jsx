import React from "react";
import ContentLoader from "react-content-loader";

function LoadingBlock(){
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"

        >
            <rect x="0" y="291" rx="3" ry="3" width="280" height="26" />
            <rect x="98" y="93" rx="0" ry="0" width="0" height="1" />
            <circle cx="140" cy="140" r="140" />
            <rect x="0" y="328" rx="6" ry="6" width="280" height="84" />
            <rect x="59" y="396" rx="6" ry="6" width="0" height="1" />
            <rect x="0" y="420" rx="6" ry="6" width="76" height="30" />
            <rect x="141" y="420" rx="20" ry="20" width="140" height="30" />
        </ContentLoader>)
}

export default LoadingBlock;