import React from "react";
import Image from "next/image";
function Institute() {
  return (
    <div className="flex flex-row items-center">
      <div className="mr-2">
<<<<<<< HEAD
        <img src="/myinstitution.svg" alt="" />
=======
       <Image width={32} height={32} src="/myinstitution.svg" alt="" />
>>>>>>> 7186ef4fb9f0c9e295aa319b9553013738102af0
      </div>
      <div className="flex flex-col">
        <div className="text-black text-base font-bold">My Institute</div>

        <div className="flex flex-row text-xs text-gray-800 gap-1">
          <div>My Class</div>
          <div> | </div>
          <div>Home</div>
        </div>
      </div>
    </div>
  );
}

export default Institute;
