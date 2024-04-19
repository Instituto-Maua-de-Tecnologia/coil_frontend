interface UserCard {
    id: number;
    avatarUrl: string;
    name: string;
    course: string;
    studentID: number;
    institution: string;
    semester: number;
    contact: string;
}

interface UserCardProps {
    userCard: UserCard;
}

export default function userCard({ userCard }: UserCardProps) {
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
        <div className="flex items-center rounded-3xl  mb-4 ">
            <div className="flex wrap items-center w-full min-h-20 ">
                <div className="sm:flex xsm:flex-wrap w-full h-full items-center lg:mt-20">
                    <div className="w-2/3 self-center ">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img h-full self-center rounded-full "
                        />
                    </div>
                    <div className="flex-col w-full h-full items-center mt-10 ">
                        <p className=" bg-slate-100 rounded-3xl p-4 mb-5">
                            {name}
                        </p>
                        <div className="flex items-center mb-5">
                            <p className="w-1/2 bg-slate-100 rounded-3xl p-4 me-5">
                                {studentID}
                            </p>
                            <p className="w-1/2 bg-slate-100 rounded-3xl p-4">
                                {institution}
                            </p>
                        </div>
                        <div className="flex  mb-5">
                            <select className="w-1/2 bg-slate-100 rounded-3xl p-4 me-5">
                                {course}
                                <option>Computer Science</option>
                            </select>
                            <select className="w-1/2 bg-slate-100 rounded-3xl p-4 ">
                                {semester}
                                <option>2</option>
                            </select>
                        </div>
                        <p className="w-full bg-slate-100 rounded-3xl p-4 mb-5">
                            {contact}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
