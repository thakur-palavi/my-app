import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#343435] text-white">
      <div className="text-2xl font-bold text-red-500 cursor-pointer">
        <Link href="/">MyBrand</Link>
      </div>

      <div className="hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-full">
        <input
          type="text"
          placeholder="Search "
          className="bg-transparent outline-none text-white px-2 w-64"
        />
        <button className="text-gray-400">🔍</button>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/" className="hidden md:block hover:text-red-500">
          Home
        </Link>
        <Link href="/contactus" className="hidden md:block hover:text-red-500">
          Contact us
        </Link>
        <Link href="/blog" className="hidden md:block hover:text-red-500">
          Blogs
        </Link>
        <Link href="/login" className="hover:text-red-500">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
