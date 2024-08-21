import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header>
			<div className='w-full h-24 flex justify-between items-center px-36 bg-slate-800 text-white'>
				<Link to='/'>
					<h1 className=' text-white hover:text-slate-200 text-2xl font-extrabold'>
						Workout Buddy
					</h1>
				</Link>

				<h4>Other stuff</h4>
			</div>
		</header>
	);
};

export default Navbar;
