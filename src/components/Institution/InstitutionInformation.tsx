import { useThemeDetector } from "@util/ThemeDetector";
import maua2 from "@assets/logo/maua2.png";
import instagramLogo from "@assets/icons/instagram.png";
import facebookLogo from "@assets/icons/facebook.png";
import twitterLogo from "@assets/icons/twitter.png";

export default function InstitutionInformation() {
    const isDarkTheme = useThemeDetector();

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            <div
                className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
            >
                <div className="self-center p-2 sm:w-1/6">
                    <img
                        src={maua2}
                        alt="institution-img"
                        className="avatar-img mx-auto sm:-mx-auto w-[23vw] rounded-full "
                    />
                </div>
                <div className="2xs:text-center sm:text-left self-center p-2 sm:w-4/6">
                    <div className="font-extrabold">
                        Mauá Institute of Technology
                    </div>
                    <div className="">Brazil</div>
                    <div className="font-semibold">
                        "Brilliant minds meet here"
                    </div>
                    <a
                        href="https://maua.br/"
                        className="text-blue-500 underline"
                    >
                        visit website
                    </a>
                </div>
                <div className="2xs:text-center xs:text-right place-content-center xs:place-items-end pl-10 md:pl-0 pr-10 md:pr-1 flex">
                    <div className="pt-1 pb-1 ">
                        <img src={instagramLogo} alt="instagram link" />
                    </div>
                    <div className="p-1">
                        <img src={facebookLogo} alt="facebook link" />
                    </div>
                    <div className="pt-1 pb-1 ">
                        <img src={twitterLogo} alt="twiter link" />
                    </div>
                </div>
            </div>
            <div className="mt-4 md:flex w-full md:h-3/4">
                <div
                    className={` justify rounded-3xl p-4 md:pb-20 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-1/3 md:mr-2`}
                >
                    <div className="p-3 font-extrabold ">
                        Institution information
                    </div>
                    <div className="custom-scrollbar overflow-y-auto  h-full p-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eleifend vestibulum urna, eget sollicitudin tortor
                        fringilla eget. Fusce sit amet elit vitae libero
                        scelerisque venenatis. Vestibulum nec vestibulum leo.
                        Nulla facilisi. Phasellus non hendrerit ante, a pulvinar
                        nibh. Vivamus eget libero euismod, blandit ex vel,
                        cursus odio. Integer nec nulla quis felis rutrum
                        eleifend non a nisi. Maecenas quis tellus quis purus
                        sodales lobortis. Sed et justo vitae magna viverra
                        varius. Phasellus interdum, magna et cursus bibendum,
                        velit arcu viverra justo, id vehicula arcu dui vel mi.
                        Ut eu est felis. Cras id leo nec nulla dapibus posuere.
                        Nullam ac est vitae eros dictum fermentum id et libero.
                        Aliquam ac odio eleifend, fringilla elit non, facilisis
                        risus.
                    </div>
                </div>
                <div
                    className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-2/3 md:ml-2`}
                >
                    <div className="p-3 font-extrabold">
                        Institution pictures
                    </div>
                    <div className="custom-scrollbar overflow-y-auto h-full p-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eleifend vestibulum urna, eget sollicitudin tortor
                        fringilla eget. Fusce sit amet elit vitae libero
                        scelerisque venenatis. Vestibulum nec vestibulum leo.
                        Nulla facilisi. Phasellus non hendrerit ante, a pulvinar
                        nibh. Vivamus eget libero euismod, blandit ex vel,
                        cursus odio. Integer nec nulla quis felis rutrum
                        eleifend non a nisi. Maecenas quis tellus quis purus
                        sodales lobortis. Sed et justo vitae magna viverra
                        varius. Phasellus interdum, magna et cursus bibendum,
                        velit arcu viverra justo, id vehicula arcu dui vel mi.
                        Ut eu est felis. Cras id leo nec nulla dapibus posuere.
                        Nullam ac est vitae eros dictum fermentum id et libero.
                        Aliquam ac odio eleifend, fringilla elit non, facilisis
                        risus.
                    </div>
                </div>
            </div>
        </div>
    );
}
