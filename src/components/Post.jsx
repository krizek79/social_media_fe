export default function Post(props) {
    return (
        <div className={"p-5 border rounded"}>
            <div
                className="border-solid border-0 border-b border-blue-600 pb-2 justify-between flex md:items-end
                flex-col md:flex-row"
            >
                <div className="font-medium text-lg">
                    Meno
                </div>
                <div className="font-normal text-xs">
                    HH:MM DD/MM/YYYY
                </div>
            </div>
            <div className="pt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid delectus distinctio
                exercitationem iure laborum molestiae nihil, non omnis quibusdam sed sit tenetur voluptate.
                Autem expedita facilis iusto maiores sed. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus ad alias aperiam dolor dolorum, ea eligendi esse, facere ipsam, labore maiores nisi nobis
                officiis provident repellendus sequi sit tenetur ullam.
            </div>
        </div>
    )
}