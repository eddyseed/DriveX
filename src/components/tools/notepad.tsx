'use client'
import styles from "@/styles/tools/notepad.module.css";

import { Textarea } from "../ui/textarea";
import Menu from "./Notepad-Assets/Menu";
const Notepad: React.FC = () => {
  return (
    <div className={`${styles.notepad}`}>
      <div>
        <div className="px-3">
          <Menu />
        </div>
        <div></div>
      </div>
      <div>
        <div>
          <Textarea wrap="off" placeholder="Start typing..." />
        </div>
        <div></div>
      </div>
    </div >
  );
};

export default Notepad;


/*
randomboiii069
AxB2E6uqnBAZyjbp
*/