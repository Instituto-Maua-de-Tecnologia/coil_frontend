import UserCard from "./UserCard";

interface User {
    id: number;
    avatarUrl: string;
    name: string;
    course: string;
    studentID: number;
    institution: string;
    semester: number;
    contact: string;
}

export default function ProjectList() {
    const userData: User[] = [
        {
            id: 1,
            avatarUrl: "/maua-fontys-dark.svg",
            name: "Íris Melero",
            course: "Computer Science",
            studentID: 23011092,
            institution: "Institute Maua of Technology",
            semester: 2,
            contact: "iris.melero@outlook.com"
        }
    ];

    return (
        <div className="w-full max-h-[85%] lg:ml-4 px-7 py-4 bg-sb-bg rounded-3xl ">
            <div className="w-full h-full my-auto">
                {userData.map((User) => (
                    <UserCard key={User.id} userCard={User} />
                ))}
            </div>
        </div>
    );
}
