import IconInterface from "./IconInterface";

const AddIcon = (props: IconInterface) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="87"
                y="38"
                width="26"
                height="125"
                rx="13"
                fill={props.fill}
            />
            <rect
                x="39"
                y="113"
                width="26"
                height="125"
                rx="13"
                transform="rotate(-90 39 113)"
                fill={props.fill}
            />
        </svg>
    );
};

export default AddIcon;
