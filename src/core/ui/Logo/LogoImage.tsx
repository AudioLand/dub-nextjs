const LogoImage: React.FCC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      className={`${className ?? "w-[95px] sm:w-[150px]"}`}
      viewBox="0 0 286 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_107_2)">
        <path
          d="M79.576 10.472V33.968H74.34V30.932C73.431 32.0467 72.301 32.8827 70.952 33.44C69.632 33.9974 68.165 34.276 66.552 34.276C64.264 34.276 62.211 33.7774 60.392 32.78C58.603 31.7827 57.195 30.3747 56.168 28.556C55.171 26.7374 54.672 24.6254 54.672 22.22C54.672 19.8147 55.171 17.7174 56.168 15.928C57.195 14.1094 58.603 12.7014 60.392 11.704C62.211 10.7067 64.264 10.208 66.552 10.208C68.077 10.208 69.471 10.472 70.732 11C72.023 11.528 73.137 12.3054 74.076 13.332V10.472H79.576ZM67.168 29.568C69.192 29.568 70.864 28.8934 72.184 27.544C73.504 26.1947 74.164 24.42 74.164 22.22C74.164 20.02 73.504 18.2454 72.184 16.896C70.864 15.5467 69.192 14.872 67.168 14.872C65.144 14.872 63.472 15.5467 62.152 16.896C60.861 18.2454 60.216 20.02 60.216 22.22C60.216 24.42 60.861 26.1947 62.152 27.544C63.472 28.8934 65.144 29.568 67.168 29.568ZM109.52 10.472V33.968H104.284V30.976C103.404 32.032 102.304 32.8534 100.984 33.44C99.664 33.9974 98.241 34.276 96.716 34.276C93.577 34.276 91.099 33.4107 89.28 31.68C87.491 29.92 86.596 27.324 86.596 23.892V10.472H92.096V23.144C92.096 25.256 92.565 26.84 93.504 27.896C94.472 28.9227 95.836 29.436 97.596 29.436C99.561 29.436 101.116 28.8347 102.26 27.632C103.433 26.4 104.02 24.64 104.02 22.352V10.472H109.52ZM139.733 1.32V33.968H134.453V30.932C133.544 32.0467 132.415 32.8827 131.065 33.44C129.745 33.9974 128.279 34.276 126.665 34.276C124.407 34.276 122.368 33.7774 120.549 32.78C118.76 31.7827 117.352 30.3747 116.325 28.556C115.299 26.708 114.785 24.596 114.785 22.22C114.785 19.844 115.299 17.7467 116.325 15.928C117.352 14.1094 118.76 12.7014 120.549 11.704C122.368 10.7067 124.407 10.208 126.665 10.208C128.22 10.208 129.643 10.472 130.933 11C132.224 11.528 133.324 12.32 134.233 13.376V1.32H139.733ZM127.325 29.568C128.645 29.568 129.833 29.2747 130.889 28.688C131.945 28.072 132.781 27.2067 133.397 26.092C134.013 24.9774 134.321 23.6867 134.321 22.22C134.321 20.7534 134.013 19.4627 133.397 18.348C132.781 17.2334 131.945 16.3827 130.889 15.796C129.833 15.18 128.645 14.872 127.325 14.872C126.005 14.872 124.817 15.18 123.761 15.796C122.705 16.3827 121.869 17.2334 121.253 18.348C120.637 19.4627 120.329 20.7534 120.329 22.22C120.329 23.6867 120.637 24.9774 121.253 26.092C121.869 27.2067 122.705 28.072 123.761 28.688C124.817 29.2747 126.005 29.568 127.325 29.568ZM146.928 10.472H152.428V33.968H146.928V10.472ZM149.7 6.6C148.703 6.6 147.867 6.292 147.192 5.676C146.518 5.0307 146.18 4.2387 146.18 3.3C146.18 2.3614 146.518 1.584 147.192 0.967999C147.867 0.322699 148.703 0 149.7 0C150.698 0 151.534 0.308 152.208 0.924C152.883 1.5107 153.22 2.2587 153.22 3.168C153.22 4.136 152.883 4.9574 152.208 5.632C151.563 6.2774 150.727 6.6 149.7 6.6ZM170.207 34.276C167.831 34.276 165.69 33.7627 163.783 32.736C161.876 31.7094 160.38 30.2867 159.295 28.468C158.239 26.62 157.711 24.5374 157.711 22.22C157.711 19.9027 158.239 17.8347 159.295 16.016C160.38 14.1974 161.876 12.7747 163.783 11.748C165.69 10.7214 167.831 10.208 170.207 10.208C172.612 10.208 174.768 10.7214 176.675 11.748C178.582 12.7747 180.063 14.1974 181.119 16.016C182.204 17.8347 182.747 19.9027 182.747 22.22C182.747 24.5374 182.204 26.62 181.119 28.468C180.063 30.2867 178.582 31.7094 176.675 32.736C174.768 33.7627 172.612 34.276 170.207 34.276ZM170.207 29.568C172.231 29.568 173.903 28.8934 175.223 27.544C176.543 26.1947 177.203 24.42 177.203 22.22C177.203 20.02 176.543 18.2454 175.223 16.896C173.903 15.5467 172.231 14.872 170.207 14.872C168.183 14.872 166.511 15.5467 165.191 16.896C163.9 18.2454 163.255 20.02 163.255 22.22C163.255 24.42 163.9 26.1947 165.191 27.544C166.511 28.8934 168.183 29.568 170.207 29.568ZM195.75 34.276C193.316 34.276 191.409 33.616 190.03 32.296C188.681 30.9467 188.006 29.0547 188.006 26.62V1.32H193.506V26.224C193.506 28.5707 194.606 29.744 196.806 29.744C197.54 29.744 198.2 29.5974 198.786 29.304L199.05 33.704C198.024 34.0854 196.924 34.276 195.75 34.276ZM225.326 10.472V33.968H220.09V30.932C219.181 32.0467 218.051 32.8827 216.702 33.44C215.382 33.9974 213.915 34.276 212.302 34.276C210.014 34.276 207.961 33.7774 206.142 32.78C204.353 31.7827 202.945 30.3747 201.918 28.556C200.921 26.7374 200.422 24.6254 200.422 22.22C200.422 19.8147 200.921 17.7174 201.918 15.928C202.945 14.1094 204.353 12.7014 206.142 11.704C207.961 10.7067 210.014 10.208 212.302 10.208C213.827 10.208 215.221 10.472 216.482 11C217.773 11.528 218.887 12.3054 219.826 13.332V10.472H225.326ZM212.918 29.568C214.942 29.568 216.614 28.8934 217.934 27.544C219.254 26.1947 219.914 24.42 219.914 22.22C219.914 20.02 219.254 18.2454 217.934 16.896C216.614 15.5467 214.942 14.872 212.918 14.872C210.894 14.872 209.222 15.5467 207.902 16.896C206.611 18.2454 205.966 20.02 205.966 22.22C205.966 24.42 206.611 26.1947 207.902 27.544C209.222 28.8934 210.894 29.568 212.918 29.568ZM245.854 10.208C248.817 10.208 251.193 11.0734 252.982 12.804C254.771 14.5347 255.666 17.1014 255.666 20.504V33.968H250.166V21.208C250.166 19.1547 249.682 17.6147 248.714 16.588C247.746 15.532 246.367 15.004 244.578 15.004C242.554 15.004 240.955 15.62 239.782 16.852C238.609 18.0547 238.022 19.8 238.022 22.088V33.968H232.522V10.472H237.758V13.508C238.667 12.4227 239.811 11.6014 241.19 11.044C242.569 10.4867 244.123 10.208 245.854 10.208ZM285.87 1.32V33.968H280.59V30.932C279.681 32.0467 278.551 32.8827 277.202 33.44C275.882 33.9974 274.415 34.276 272.802 34.276C270.543 34.276 268.505 33.7774 266.686 32.78C264.897 31.7827 263.489 30.3747 262.462 28.556C261.435 26.708 260.922 24.596 260.922 22.22C260.922 19.844 261.435 17.7467 262.462 15.928C263.489 14.1094 264.897 12.7014 266.686 11.704C268.505 10.7067 270.543 10.208 272.802 10.208C274.357 10.208 275.779 10.472 277.07 11C278.361 11.528 279.461 12.32 280.37 13.376V1.32H285.87ZM273.462 29.568C274.782 29.568 275.97 29.2747 277.026 28.688C278.082 28.072 278.918 27.2067 279.534 26.092C280.15 24.9774 280.458 23.6867 280.458 22.22C280.458 20.7534 280.15 19.4627 279.534 18.348C278.918 17.2334 278.082 16.3827 277.026 15.796C275.97 15.18 274.782 14.872 273.462 14.872C272.142 14.872 270.954 15.18 269.898 15.796C268.842 16.3827 268.006 17.2334 267.39 18.348C266.774 19.4627 266.466 20.7534 266.466 22.22C266.466 23.6867 266.774 24.9774 267.39 26.092C268.006 27.2067 268.842 28.072 269.898 28.688C270.954 29.2747 272.142 29.568 273.462 29.568Z"
          fill="#652CD1"
        />
        <path
          d="M2.14247 28.433C4.93731 36.4308 12.5487 42.168 21.5 42.168C30.4513 42.168 38.0627 36.4308 40.8573 28.433M12.48 21.668H1C1 10.3461 10.1782 1.16797 21.5 1.16797C32.8218 1.16797 42 10.3461 42 21.668H37.08M37.08 21.668V19.618M37.08 21.668V23.718M12.6517 10.4299V32.9143M16.1169 12.1642V31.18M19.5819 13.8944V29.4498M23.047 15.6287V27.7155M26.5121 17.3589V25.9853M29.9772 19.0932V24.251M33.4422 20.8275V22.5167"
          stroke="#652CD1"
          strokeWidth="2.5"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_107_2">
          <rect width="286" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoImage;
