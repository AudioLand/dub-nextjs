import { useEffect, useState } from "react";
import {
  DARK_THEME_CLASSNAME,
  SYSTEM_THEME_CLASSNAME,
  getStoredTheme,
  isDarkSystemTheme,
} from "~/core/theming";

const AppSumoLogoImage: React.FCC<{
  className?: string;
}> = ({ className }) => {
  const [isDark, setIsDark] = useState(false); // Default to a consistent state

  useEffect(() => {
    // Client-specific logic to determine the theme
    const defaultTheme = getStoredTheme();
    const isDarkTheme = defaultTheme === DARK_THEME_CLASSNAME;
    const isSystemTheme = defaultTheme === SYSTEM_THEME_CLASSNAME;
    const shouldUseSystemDarkTheme = isSystemTheme && isDarkSystemTheme();

    setIsDark(isDarkTheme || shouldUseSystemDarkTheme);
  }, []);

  if (isDark) {
    return (
      <svg
        className={`${className ?? "w-[70px] sm:w-[120px]"}`}
        viewBox="0 0 1180 183"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_107_3)">
          <path
            d="M744.691 111.655C744.691 142.881 730.498 142.881 722.928 142.881C716.305 142.881 701.165 142.881 701.165 111.655V24.6006H665.207V117.332C665.207 153.29 688.863 177.891 722.928 177.891C756.993 177.891 780.649 153.281 780.649 117.332V24.6006H744.691V111.655Z"
            fill="white"
          />
          <path
            d="M1099.53 20.8174C1078.2 20.8174 1057.74 29.2913 1042.66 44.3749C1027.57 59.4586 1019.1 79.9164 1019.1 101.248C1019.1 122.579 1027.57 143.037 1042.66 158.121C1057.74 173.204 1078.2 181.678 1099.53 181.678C1144.95 181.678 1179.96 146.668 1179.96 101.249C1179.97 90.6839 1177.89 80.221 1173.86 70.4586C1169.82 60.6963 1163.89 51.826 1156.42 44.3555C1148.95 36.885 1140.08 30.9608 1130.32 26.9218C1120.56 22.8829 1110.09 20.8085 1099.53 20.8174V20.8174ZM1099.53 144.775C1088.03 144.645 1077.03 140.017 1068.9 131.883C1060.76 123.748 1056.13 112.752 1056 101.249C1056 89.7046 1060.59 78.6333 1068.75 70.4704C1076.92 62.3075 1087.99 57.7217 1099.53 57.7217C1111.07 57.7217 1122.15 62.3075 1130.31 70.4704C1138.47 78.6333 1143.06 89.7046 1143.06 101.249C1143.07 106.969 1141.96 112.636 1139.78 117.924C1137.59 123.212 1134.39 128.016 1130.34 132.061C1126.3 136.106 1121.49 139.311 1116.21 141.493C1110.92 143.675 1105.25 144.79 1099.53 144.775V144.775Z"
            fill="white"
          />
          <path
            d="M80.4296 0L0 176.947H40.6876L55.8279 142.882H105.033L120.173 176.947H160.861L80.4296 0ZM65.291 112.6L80.4313 75.6964L95.5749 112.6H65.291Z"
            fill="white"
          />
          <path
            d="M255.477 25.5498H196.817V174.109H233.721V131.528H253.591C290.494 131.528 313.205 110.711 313.205 78.5391C313.205 45.4216 291.442 25.5498 255.477 25.5498ZM275.349 79.4898C275.349 91.7949 266.833 99.3616 252.639 99.3616H233.721V58.669H252.645C267.786 58.669 275.356 66.2391 275.356 79.4864L275.349 79.4898Z"
            fill="white"
          />
          <path
            d="M408.77 25.5498H350.11V174.109H387.014V131.528H406.886C443.789 131.528 466.499 110.711 466.499 78.5391C465.552 45.4216 443.787 25.5498 408.77 25.5498ZM428.642 79.4898C428.642 91.7949 420.126 99.3616 405.932 99.3616H387.014V58.669H405.938C420.131 58.669 428.649 66.2391 428.649 79.4864L428.642 79.4898Z"
            fill="white"
          />
          <path
            d="M575.313 72.8595C545.984 65.2893 540.303 61.5051 540.303 52.042V51.0964C540.303 42.5806 547.873 37.849 561.12 37.849C574.368 37.849 588.561 43.5262 604.647 53.935L605.592 54.8806L626.41 24.6017L625.464 23.6561C607.427 9.39315 585.06 1.71589 562.066 1.89465C526.11 1.89465 501.507 23.6578 501.507 53.9383V54.884C501.507 90.8417 526.117 99.3575 558.282 107.873C586.669 115.443 591.399 120.178 591.399 127.745V128.691C591.399 138.154 582.884 142.884 568.689 142.884C551.664 142.884 535.57 136.259 519.484 123.012L518.538 122.066L494.884 150.454L495.829 151.399C515.825 169.345 541.825 179.137 568.691 178.84C607.487 178.84 632.089 158.022 632.089 124.9C630.196 93.6803 608.433 81.3786 575.313 72.8595Z"
            fill="white"
          />
          <path
            d="M903.659 182.624L859.186 106.926L845.938 176.947H813.767L846.886 20.8174L905.546 119.226L961.38 20.8174L994.498 176.947H960.435L947.187 107.871L903.659 182.624Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_107_3">
            <rect width="1180" height="183" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={`${className ?? "w-[70px] sm:w-[120px]"}`}
      viewBox="0 0 1180 183"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M744.691 111.655C744.691 142.881 730.498 142.881 722.928 142.881C716.305 142.881 701.165 142.881 701.165 111.655V24.6006H665.207V117.332C665.207 153.29 688.863 177.891 722.928 177.891C756.993 177.891 780.649 153.281 780.649 117.332V24.6006H744.691V111.655Z"
        fill="#1B1B1B"
      />
      <path
        d="M1099.53 20.8174C1078.2 20.8174 1057.74 29.2913 1042.66 44.3749C1027.57 59.4586 1019.1 79.9164 1019.1 101.248C1019.1 122.579 1027.57 143.037 1042.66 158.121C1057.74 173.204 1078.2 181.678 1099.53 181.678C1144.95 181.678 1179.96 146.668 1179.96 101.249C1179.97 90.6839 1177.89 80.221 1173.86 70.4586C1169.82 60.6963 1163.89 51.826 1156.42 44.3555C1148.95 36.885 1140.08 30.9608 1130.32 26.9218C1120.56 22.8829 1110.09 20.8085 1099.53 20.8174V20.8174ZM1099.53 144.775C1088.03 144.645 1077.03 140.017 1068.9 131.883C1060.76 123.748 1056.13 112.752 1056 101.249C1056 89.7046 1060.59 78.6333 1068.75 70.4704C1076.92 62.3075 1087.99 57.7217 1099.53 57.7217C1111.07 57.7217 1122.15 62.3075 1130.31 70.4704C1138.47 78.6333 1143.06 89.7046 1143.06 101.249C1143.07 106.969 1141.96 112.636 1139.78 117.924C1137.59 123.212 1134.39 128.016 1130.34 132.061C1126.3 136.106 1121.49 139.311 1116.21 141.493C1110.92 143.675 1105.25 144.79 1099.53 144.775V144.775Z"
        fill="#1B1B1B"
      />
      <path
        d="M80.4296 0L0 176.947H40.6876L55.8279 142.882H105.033L120.173 176.947H160.861L80.4296 0ZM65.291 112.6L80.4313 75.6964L95.5749 112.6H65.291Z"
        fill="#1B1B1B"
      />
      <path
        d="M255.477 25.5498H196.817V174.109H233.721V131.528H253.591C290.494 131.528 313.205 110.711 313.205 78.5391C313.205 45.4216 291.442 25.5498 255.477 25.5498ZM275.349 79.4898C275.349 91.7949 266.833 99.3616 252.639 99.3616H233.721V58.669H252.645C267.786 58.669 275.356 66.2391 275.356 79.4864L275.349 79.4898Z"
        fill="#1B1B1B"
      />
      <path
        d="M408.77 25.5498H350.11V174.109H387.014V131.528H406.886C443.789 131.528 466.499 110.711 466.499 78.5391C465.552 45.4216 443.787 25.5498 408.77 25.5498ZM428.642 79.4898C428.642 91.7949 420.126 99.3616 405.932 99.3616H387.014V58.669H405.938C420.131 58.669 428.649 66.2391 428.649 79.4864L428.642 79.4898Z"
        fill="#1B1B1B"
      />
      <path
        d="M575.313 72.8595C545.984 65.2893 540.303 61.5051 540.303 52.042V51.0964C540.303 42.5806 547.873 37.849 561.12 37.849C574.368 37.849 588.561 43.5262 604.647 53.935L605.592 54.8806L626.41 24.6017L625.464 23.6561C607.427 9.39315 585.06 1.71589 562.066 1.89465C526.11 1.89465 501.507 23.6578 501.507 53.9383V54.884C501.507 90.8417 526.117 99.3575 558.282 107.873C586.669 115.443 591.399 120.178 591.399 127.745V128.691C591.399 138.154 582.884 142.884 568.689 142.884C551.664 142.884 535.57 136.259 519.484 123.012L518.538 122.066L494.884 150.454L495.829 151.399C515.825 169.345 541.825 179.137 568.691 178.84C607.487 178.84 632.089 158.022 632.089 124.9C630.196 93.6803 608.433 81.3786 575.313 72.8595Z"
        fill="#1B1B1B"
      />
      <path
        d="M903.659 182.624L859.186 106.926L845.938 176.947H813.767L846.886 20.8174L905.546 119.226L961.38 20.8174L994.498 176.947H960.435L947.187 107.871L903.659 182.624Z"
        fill="#1B1B1B"
      />
    </svg>
  );
};

export default AppSumoLogoImage;