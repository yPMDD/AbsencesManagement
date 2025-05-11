interface PropsTypes {
	text: string;
	to: string;
}

import { useNavigate } from "react-router-dom";

const HeaderButton = (props: PropsTypes) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(props.to);
	};

	return (
		<button
			className="relative pb-2 group font-semibold rounded"
			onClick={handleClick}
		>
			{props.text}
			<div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
		</button>
	);
};

export default HeaderButton;
