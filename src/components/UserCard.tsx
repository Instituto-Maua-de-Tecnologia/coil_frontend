type UserCardProps = {
    userCard: {
        id: number;
        avatarUrl: string;
        name: string;
        course: string;
        studentID: number;
        institution: string;
        semester: number;
        contact: string;
    };
};

export default function UserCard({ userCard }: UserCardProps) {
    const {
        avatarUrl,
        name,
        course,
        studentID,
        institution,
        semester,
        contact
    } = userCard;

    return (
        <div className="flex items-center justify-center rounded-3xl mb-4 p-4">
            <img
                src={avatarUrl}
                alt="Avatar"
                className="avatar-img w-24 h-24 rounded-full mr-4"
            />
            <div className="flex flex-col flex-grow">
                <p className="text-lg font-bold mb-2">{name}</p>
                <div className="flex mb-2">
                    <p className="w-1/2 mr-2">{`${studentID.toString().substring(0, 2)}.${studentID.toString().substring(2, 7)}-${studentID.toString().substring(7, 9)}`}</p>
                    <p className="w-1/2">{institution}</p>
                </div>
                <div className="flex mb-2">
                    <select className="w-1/2 mr-2 bg-gray-200 rounded-3xl p-2 cursor-pointer">
                        <option value={course}>{course}</option>
                    </select>
                    <select className="w-1/2 bg-gray-200 rounded-3xl p-2 cursor-pointer">
                        <option value={semester}>{semester}</option>
                    </select>
                </div>
                <p className="bg-gray-200 rounded-3xl p-2">{contact}</p>
            </div>
        </div>
    );
}
