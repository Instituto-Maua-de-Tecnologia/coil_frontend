const resultIcon = ({
    className = "",
    fill
}: {
    className?: string;
    fill?: string;
}) => {
    return (
        <svg
            className={`${className} scale-125`}
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_5_3532"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="17"
            >
                <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_5_3532)">
                <path
                    fill={fill}
                    d="M7.06683 9.69992L5.61683 8.24992C5.49461 8.1277 5.34194 8.06947 5.15883 8.07525C4.97527 8.08059 4.82238 8.14436 4.70016 8.26658C4.57794 8.38881 4.51683 8.54436 4.51683 8.73325C4.51683 8.92214 4.57794 9.0777 4.70016 9.19992L6.60016 11.0999C6.72238 11.2221 6.87794 11.2833 7.06683 11.2833C7.25572 11.2833 7.41127 11.2221 7.5335 11.0999L11.3168 7.31659C11.4391 7.19436 11.4975 7.04147 11.4922 6.85792C11.4864 6.67481 11.4224 6.52214 11.3002 6.39992C11.1779 6.2777 11.0224 6.21658 10.8335 6.21658C10.6446 6.21658 10.4891 6.2777 10.3668 6.39992L7.06683 9.69992ZM8.00016 15.1666C7.07794 15.1666 6.21127 14.9915 5.40016 14.6413C4.58905 14.2915 3.8835 13.8166 3.2835 13.2166C2.6835 12.6166 2.20861 11.911 1.85883 11.0999C1.50861 10.2888 1.3335 9.42214 1.3335 8.49992C1.3335 7.5777 1.50861 6.71103 1.85883 5.89992C2.20861 5.08881 2.6835 4.38325 3.2835 3.78325C3.8835 3.18325 4.58905 2.70814 5.40016 2.35792C6.21127 2.00814 7.07794 1.83325 8.00016 1.83325C8.92238 1.83325 9.78905 2.00814 10.6002 2.35792C11.4113 2.70814 12.1168 3.18325 12.7168 3.78325C13.3168 4.38325 13.7917 5.08881 14.1415 5.89992C14.4917 6.71103 14.6668 7.5777 14.6668 8.49992C14.6668 9.42214 14.4917 10.2888 14.1415 11.0999C13.7917 11.911 13.3168 12.6166 12.7168 13.2166C12.1168 13.8166 11.4113 14.2915 10.6002 14.6413C9.78905 14.9915 8.92238 15.1666 8.00016 15.1666ZM8.00016 13.8333C9.47794 13.8333 10.7364 13.3139 11.7755 12.2753C12.8142 11.2361 13.3335 9.9777 13.3335 8.49992C13.3335 7.02214 12.8142 5.7637 11.7755 4.72459C10.7364 3.68592 9.47794 3.16659 8.00016 3.16659C6.52238 3.16659 5.26416 3.68592 4.2255 4.72459C3.18638 5.7637 2.66683 7.02214 2.66683 8.49992C2.66683 9.9777 3.18638 11.2361 4.2255 12.2753C5.26416 13.3139 6.52238 13.8333 8.00016 13.8333Z"
                />
            </g>
        </svg>
    );
};
export default resultIcon;