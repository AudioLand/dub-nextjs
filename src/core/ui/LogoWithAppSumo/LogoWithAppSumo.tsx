import Link from "next/link";
import AppSumoLogoImage from "./AppSumoLogo";
import LogoImage from "./LogoImage";

const LogoWithAppSumo: React.FCC<{ href?: string; className?: string }> = ({ href, className }) => {
  return (
    <Link href={href ?? "/"}>
      <div className="flex gap-3">
        <LogoImage className={className} />
        <span>with</span>
        <AppSumoLogoImage className={className} />
      </div>
    </Link>
  );
};

export default LogoWithAppSumo;
