import IUser from "@interfaces/user/IUser.ts";

export default function getUserName() {
    if (
        localStorage.getItem("user") !== null &&
        localStorage.getItem("user") !== undefined
    ) {
        return (JSON.parse(localStorage.getItem("user") || "") as IUser).name;
    }
    return null;
}
