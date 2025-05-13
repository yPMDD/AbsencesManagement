import LogoutIcon from "../ui/LogoutIcon";

const LogoutButton = () => {
	return (
		<button className="  p-2 hover:bg-green-800 items-center justify-start w-8 h-8  rounded cursor-pointer ">
			<LogoutIcon />
		</button>
	);
};

export default LogoutButton;
