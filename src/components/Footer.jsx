export default function Footer() {
    return (
        <footer
            className={"flex py-6 px-10 w-full shadow-md justify-between columns-2 min-h-screen"}
        >
            <div className={"text-left"}>© 2023 Copyright: Matej Križan</div>
            <div className={"text-right"}>
                Contact: {" "}
                <a className={"underline text-blue-600"} href={"mailto:krizan.matej79@gmail.com"}>
                    krizan.matej79@gmail.com
                </a>
            </div>
        </footer>
    )
}