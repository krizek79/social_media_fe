import Login from './Login.jsx'

export default function Header() {
    return (
        <header className={"flex py-6 px-10 m-auto bg-white shadow-md items-end justify-between"}>
            <div className={""}>
                <h1 className={"text-blue-700 text-3xl"}>Social Media</h1>
            </div>
            <div className={""}>
                <Login/>
            </div>
        </header>
    )
}