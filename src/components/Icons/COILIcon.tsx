import IconInterface from "./IconInterface";

const COILIcon = (props: IconInterface) => {
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
                d="M24 121.252C24 127.328 28.9249 132.252 35 132.252H164C170.075 132.252 175 127.328 175 121.252V39.165C175 33.0899 170.075 28.165 164 28.165H35C28.9249 28.165 24 33.0899 24 39.165V121.252ZM37.1942 116.058C37.1942 117.715 38.5373 119.058 40.1942 119.058H158.806C160.463 119.058 161.806 117.715 161.806 116.058V42.8932C161.806 41.2363 160.463 39.8932 158.806 39.8932H40.1942C38.5373 39.8932 37.1942 41.2363 37.1942 42.8932V116.058Z"
                fill={props.fill}
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M81.0461 142L67 172H128L113.553 142H81.0461Z"
                fill={props.fill}
            />
        </svg>
    );
};

export default COILIcon;
