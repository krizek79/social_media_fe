export default function FooterBasic() {
    return (
        <footer
            className="z-20 w-full bg-[#F6F6F6] border-t border-gray-200"
        >
            <div className="px-10 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-left">© 2023 Copyright: Matej Križan</div>
                <div className="text-right">
                    Contact: {" "}
                    <a className="underline text-blue-600" href="mailto:krizan.matej79@gmail.com">
                        krizan.matej79@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    )
}