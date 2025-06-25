import LogoutButton from "./LogoutButton";
import HeaderButton from "./HeaderButton";

const Header = () => {
	return (
		<>
			<header className="fixed top-0 w-full text-white bg-green-700 shadow-md ">
				<div className="flex gap-[750px] ml-80 mr-80 p-4">
					<a href="#">
						<img
							className="w-auto h-8 rounded filter "
							src="/images/transEmsi.png"
							alt=""
						/>
					</a>
					{/* right side context */}
					<div className="flex gap-8 ">
						<HeaderButton text="Dashboard" to="/SDashboard" />
						<HeaderButton text="Profile" to="/SProfile" />
						<LogoutButton />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
