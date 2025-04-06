interface propsTypes {
	number: string;
	label: string;
}
const Card = (props: propsTypes) => {
	return (
		<div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-80 rounded bg-gray-100 p-4 shadow-md basis-[calc(25%-30px)] ">
			<span className="p-2 text-3xl font-semibold text-green-700">
				{props.number}
			</span>
			<p className="font-semibold ">{props.label}</p>
		</div>
	);
};

export default Card;
