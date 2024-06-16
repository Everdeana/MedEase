import { FiX } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";



export default function Reg_Top() {
    return (
        <div className="flex justify-between">
            <div className="Reg_Top flex  w-[375px] h-[65px] bg-white border-t-0  border-b  border-[#c0c0c0]/[0.51]  items-center mx-auto">
                <img src="/assets/image/logo.png" class="w-[99px] h-[49px] object-cover " />
                <div>
                    {/* <RxDividerVertical size={28} /> */}
                </div>
                <p class="text-[17px] text-left text-black pl-4">메디이즈 로그인</p>
                <div>
                    <FiX size={28} className="w-20 ml-10" />
                </div>
            </div>
        </div>
    );
}