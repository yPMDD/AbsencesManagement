interface propsTypes {
	text: string;
}

const HeaderButton = (props: propsTypes) => {
	return (
		<button className="relative pb-2 group font-semibold rounded   ">
			{props.text}
			<div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
		</button>
	);
};

export default HeaderButton;
