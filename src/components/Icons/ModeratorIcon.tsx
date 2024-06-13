import IconInterface from "./IconInterface";

const ModeratorIcon = (props: IconInterface) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M64.779 74.5431C63.2414 78.6165 62.4 83.0316 62.4 87.6431C62.4 108.133 79.0102 124.743 99.5 124.743C119.99 124.743 136.6 108.133 136.6 87.6431C136.6 83.0316 135.759 78.6165 134.221 74.5431H64.779Z"
                fill={props.fill}
            />
            <path
                d="M50 25.5758L77.5387 43.697L99.5 20L121.461 43.697L149 25.5758L135.056 66H63.9437L50 25.5758Z"
                fill={props.fill}
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40 174.443C40 152.137 52.2748 132.697 70.4383 122.511C78.3206 129.061 88.4503 133 99.5 133C110.55 133 120.679 129.061 128.562 122.511C146.725 132.697 159 152.137 159 174.443C159 176.571 158.888 178.673 158.67 180.743H40.3296C40.1117 178.673 40 176.571 40 174.443Z"
                fill={props.fill}
            />
        </svg>
    );
};

export default ModeratorIcon;
