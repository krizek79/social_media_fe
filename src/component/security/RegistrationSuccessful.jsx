import {useNavigate} from "react-router-dom";

export default function RegistrationSuccessful() {

    const navigate = useNavigate()

    return (
        <div
            className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded shadow-md
                md:p-6"
        >
            <div className="w-full flex flex-col gap-y-3 px-3">
                <h1 className="text-green-700 text-2xl">Registration successful</h1>
                <div>You can now sign in {" "}
                    <a
                        className="cursor-pointer text-blue-600"
                        onClick={() => navigate("/auth")}
                    >
                        here
                    </a>
                    .
                </div>
            </div>
        </div>
    )
}