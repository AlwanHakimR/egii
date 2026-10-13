import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black h-full">
      <Navbar></Navbar>
      <div className="flex justify-center items-center w-full h-[100vh] ">
        <div className="w-fit font-bold">WEBSITENYA EGII</div>
      </div>
    </div>
  );
}
