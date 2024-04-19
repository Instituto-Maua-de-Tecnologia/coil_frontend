import filterImage from "@assets/Filter.png";

export default function Filter() {
    return (
        <button
            className={
                "max-h-[56px] max-w-[56px] rounded-full absolute right-12"
            }
        >
            <img src={filterImage} alt={"filter image"} />
        </button>
    );
}
