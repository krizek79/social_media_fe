export default function FooterBasic() {
    return (
        <footer
            className="left-0 z-20 w-full px-10 py-4 bg-white border-t border-gray-200 flex flex-col
            md:flex-row items-center justify-between md:py-6 md:px-10 dark:bg-gray-800 dark:border-gray-600"
        >
            <div className="text-left">© 2023 Copyright: Matej Križan</div>
            <div className="text-right">
                Contact: {" "}
                <a className="underline text-blue-600" href="mailto:krizan.matej79@gmail.com">
                    krizan.matej79@gmail.com
                </a>
            </div>
        </footer>
    )
}