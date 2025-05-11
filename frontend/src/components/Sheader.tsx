import LogoutButton from "./LogoutButton";
import HeaderButton from "./HeaderButton";

const Header = () => {
	return (
		<>
			<header className=" fixed top-0 bg-green-700 text-white w-full shadow-md ">
				<div className="flex gap-[750px] ml-80 mr-80 p-4">
					<a href="#">
						<img
							className="h-8 w-auto filter brightness-0 invert"
							src="/images/transEmsi.png"
							alt=""
						/>
					</a>
					{/* right side context */}
					<div className="flex gap-8  ">
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
