const enrolledIcon = ({
    className = "",
    fill
}: {
    className?: string;
    fill?: string;
}) => {
    return (
        <svg
            className={className}
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_68_286"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="17"
            >
                <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_68_286)">
                <path
                    fill={fill}
                    d="M2.66665 13.8333C2.29998 13.8333 1.9862 13.7029 1.72531 13.442C1.46398 13.1807 1.33331 12.8667 1.33331 12.5V4.49999C1.33331 4.13332 1.46398 3.81955 1.72531 3.55866C1.9862 3.29732 2.29998 3.16666 2.66665 3.16666H13.3333C13.7 3.16666 14.014 3.29732 14.2753 3.55866C14.5362 3.81955 14.6666 4.13332 14.6666 4.49999V12.5C14.6666 12.8667 14.5362 13.1807 14.2753 13.442C14.014 13.7029 13.7 13.8333 13.3333 13.8333H2.66665ZM7.99998 9.04999C8.05553 9.04999 8.11376 9.04154 8.17465 9.02466C8.23598 9.00821 8.29442 8.98332 8.34998 8.94999L13.0666 5.99999C13.1555 5.94443 13.2222 5.8751 13.2666 5.79199C13.3111 5.70843 13.3333 5.61666 13.3333 5.51666C13.3333 5.29443 13.2389 5.12777 13.05 5.01666C12.8611 4.90555 12.6666 4.9111 12.4666 5.03332L7.99998 7.83332L3.53331 5.03332C3.33331 4.9111 3.13887 4.90821 2.94998 5.02466C2.76109 5.14155 2.66665 5.30555 2.66665 5.51666C2.66665 5.62777 2.68887 5.72488 2.73331 5.80799C2.77776 5.89155 2.84442 5.95555 2.93331 5.99999L7.64998 8.94999C7.70553 8.98332 7.76398 9.00821 7.82531 9.02466C7.8862 9.04154 7.94442 9.04999 7.99998 9.04999Z"
                />
            </g>
        </svg>
    );
};

export default enrolledIcon;