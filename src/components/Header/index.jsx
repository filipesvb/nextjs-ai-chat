import Image from "next/image";
import styles from "./header.module.css";
import {outfit} from '../../app/layout'
import logo from "./logo.png";
import SearchInput from "../SearchInput";
import { IconBell, IconCamera } from "../Icons";

import avatar from "./avatar.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`flex gap-1 ${outfit.className} items-baseline-last`}>
        <div className="text-4xl">Vidy</div>
        <div>- Seu amigo cinéfilo virtual</div>
      </div>



      <ul className={styles.actions}>
    
        <li>
          <Image src={avatar} className="rounded-full max-w-15 " alt="" />
        </li>
      </ul>
    </header>
  );
};
