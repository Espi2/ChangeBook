import { Reports, User } from "../interfaces/interfaces";

interface Props {
    user: User;
}

export const ReportCard = ({ user }: Props) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-4 flex justify-between items-centered">
            <h3 className="text-lg font-semibold">{user.codigo}</h3>
            <p className="text-md text-gray-700">{user.nombre}</p>
            <p className="text-sm text-gray-500">{new Date(user.strikes).toLocaleDateString()}</p>
        </div>

    );
}
