import TitleHeader from "@components/TitleHeader.tsx";

export default function SignUp() {
    return (
        <>
            <TitleHeader title={"Sign Up"}></TitleHeader>
            <div className="flex-gro h-screen mx-3 overflow-hidden flex flex-row">
                <div className="w-full max-h-[75%] bg-sb-bg rounded-3xl">
                    <select>
                        <option value={"fodasse"}>fodasse</option>
                    </select>
                    <select>
                        <option value={"fodasse21"}>fodasse21</option>
                    </select>
                </div>
            </div>
        </>
    );
}
