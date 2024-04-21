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
        <div className="flex items- rounded-3xl  mb-4 ">
            <div className="flex wrap items-center w-full min-h-20 ">
                <div className="sm:flex xsm:flex-wrap w-full h-full lg:mt-20">
                    <div className="w-full">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img sm:-mx-auto mx-auto w-[70%] h-full rounded-full "
                        />
                    </div>
                    <div className="flex-col w-full h-full items-center mt-10 ">
                        <p className=" bg-slate-100 rounded-3xl p-4 mb-5">
                            {name}
                        </p>
                        <div className="flex items-center mb-5">
                            <p className="w-1/2 bg-slate-100 rounded-3xl p-4 me-5">
                                {`${studentID.toString().substring(0, 2)}.${studentID.toString().substring(2, 7)}-${studentID.toString().substring(7, 9)}`}
                            </p>
                            <p className="w-1/2 bg-slate-100 rounded-3xl p-4">
                                {institution}
                            </p>
                        </div>
                        <div className="flex mb-5">
                            <select className="w-1/2 cursor-pointer bg-slate-100 rounded-3xl p-4 me-5">
                                <option value={course}>{course}</option>
                            </select>
                            <select className="w-1/2 cursor-pointer bg-slate-100 rounded-3xl p-4 ">
                                <option value={semester}>{semester}</option>
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
