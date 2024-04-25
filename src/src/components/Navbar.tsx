const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-6 border-b-2 border-black h-20">
        <div className=" text-2xl">
          <span className="text-[#FF5B19]">J</span>o
          <span className="text-[#FF5B19]">J</span>i
          <span className="text-[#FF5B19]">K</span>a
        </div>
        <div className="flex space-x-4">
          <p className="hover:underline ">
            <span className="text-[#FF5B19]">135</span>22121
          </p>
          <p className="hover:underline ">
            <span className="text-[#FF5B19]">135</span>22125
          </p>
          <p className="hover:underline  ">
            <span className="text-[#FF5B19]">135</span>22128
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
