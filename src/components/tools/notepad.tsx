'use client'
import styles from "@/styles/tools/notepad.module.css";

import { Textarea } from "../ui/textarea";
import Menu from "./Notepad-Assets/Menu";
import SubMenu from "./Notepad-Assets/SubMenu";
const Notepad: React.FC = () => {
  return (
    <div className={`${styles.notepad}`}>
      <div className="bg-secondary border-b-1 border-slate-300 border-solid">
        <div className="px-3">
          <Menu/>
        </div>
        <div className="">

        </div>
      </div>
      <div>
        <div>
        <Textarea wrap="off" placeholder="Start typing..." className="border-solid px-5 py-4 border-1 border-slate-300" />
        </div>
        <div className="bg-slate-100 m-1 border-1 border-slate-300">
          <div className="flex items-end justify-center">
            <SubMenu/>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div >
  );
};

export default Notepad;


/*
randomboiii069
AxB2E6uqnBAZyjbp
*/