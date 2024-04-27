import jojikaImage from "../../public/JoJiKa.jpg";

const AboutUs = () => {
  return (
    <div className="h-screen bg-black flex text-[#FF5B19]" id="about">
      <div className="w-1/2 h-full flex items-center justify-center border-r-2 border-r-[#FF5B19]">
        <img src={jojikaImage} alt="" className="h-96 w-96" />
      </div>
      <div className="w-1/2 h-full">
        <div className="h-1/4">
          <h3 className="text-3xl mt-4 ml-4">Jonathan Emmanuel Saragih</h3>
          <p className="ml-4 mt-4 text-xl text-white">13522121</p>
        </div>
        <div className="h-1/4 border-y-[#FF5B19] border-y-2">
          <h3 className="text-3xl mt-4 ml-4">Satriadhikara Panji Yudhistira</h3>
          <p className="ml-4 mt-4 text-xl text-white">13522125</p>
        </div>
        <div className="h-1/4">
          <h3 className="text-3xl mt-4 ml-4">Mohammad Andhika Fadillah</h3>
          <p className="ml-4 mt-4 text-xl text-white">13522128</p>
        </div>
        <div className="border-t-2 border-t-[#FF5B19] flex justify-center items-center">
          <h3 className="text-6xl mt-16">
            <span className="text-white">J</span>o
            <span className="text-white">J</span>i
            <span className="text-white">K</span>a
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
