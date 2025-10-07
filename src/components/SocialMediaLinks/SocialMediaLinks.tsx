import React from "react";
import type { SocialMediaIconProps } from "./types/SocialMediaLinks.types";
import styles from "./SocialMediaLinks.module.scss";
import Image from "next/image";
import { CONTACTS } from "@/constants/contacts";

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  platform,
  size = 64
}) => {
  let iconSrc;
  let link = "";

  switch (platform) {
    case "instagram":
      iconSrc = "/icon/instagram.svg";
      link = CONTACTS.instagramHref;
      break;
    case "telegram":
      iconSrc = "/icon/telegram.svg";
      link = CONTACTS.telegramHref;
      break;
    case "viber":
      iconSrc = "/icon/viber.svg";
      link = CONTACTS.viberHref;
      break;
    default:
      iconSrc = "/icon/instagram.svg";
      link = CONTACTS.instagramHref;
  }

  return (
    <a href={link} rel="noopener noreferrer" target="_blank">
      <Image
        alt={`${platform} icon`}
        className={styles.icon}
        height={size}
        src={iconSrc}
        width={size}
      />
    </a>
  );
};

export default SocialMediaIcon;
