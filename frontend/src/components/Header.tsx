import HeaderButton from "./HeaderButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
	return (
		<>
			<header className="  bg-green-700 text-white shadow-md ">
				<div className="flex ml-80 mr-80 p-4">
					<a href="#">
						<img
							className="h-8 w-auto filter brightness-0 invert"
							src="/images/transEmsi.png"
							alt=""
						/>
					</a>
					{/* right side context */}
					<div className="flex gap-8 fixed right-0 mr-80">
						<HeaderButton text="Dashboard" />
						<HeaderButton text="Absences" />
						<HeaderButton text="Students" />
						<LogoutButton />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
