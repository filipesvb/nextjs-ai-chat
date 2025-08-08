import Image from "next/image";
import styles from "./header.module.css";
import { outfit } from "../../app/layout";
import logo from "./logo.png";
import SearchInput from "../SearchInput";
import { IconBell, IconCamera } from "../Icons";

import avatar from "./avatar.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`flex gap-3 ${outfit.className} items-center`}>
        <Image src={logo} width={64} height={64} alt="Logo do site" />
        <div className="flex items-baseline-last gap-1">
          <div className="text-4xl">ROB</div>
          <div>- Tech Help</div>
        </div>
      </div>

      <ul className={styles.actions}>
        <li>
          <Image src={avatar} className="rounded-full max-w-15 " alt="" />
        </li>
      </ul>
    </header>
  );
};
