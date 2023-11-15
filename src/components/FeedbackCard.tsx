import { StarIcon as EmptyStar } from "@heroicons/react/24/outline";
import { StarIcon as FullStar } from "@heroicons/react/24/solid";
import Image from "next/image";

export interface FeedbackCardType {
  avatarUrl: string;
  name: string;
  rating: number;
  comment: string;
}

const FeedbackCard = ({ avatarUrl, name, rating, comment }: FeedbackCardType) => {
  const getStar = () => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starArray.push(<FullStar key={i} width={20} height={20} />);
      } else {
        starArray.push(<EmptyStar key={i} width={20} height={20} />);
      }
    }
    return starArray;
  };

  return (
    <div className="sm:max-w-[400px] w-[90vw] min-h-60 sm:mx-5 mb-10 mx-0 rounded-3xl p-10 shadow-[0_0px_20px_rgba(0,0,0,0.3)] shadow-violet-700">
      <div className="flex flex-row items-center">
        <Image src={avatarUrl} alt="avatar" width={40} height={40} />
        <div className="ml-5">
          <p>{name}</p>
          <div className="flex flex-row mt-3">{getStar()}</div>
        </div>
      </div>
      <p className="mt-5">{comment}</p>
    </div>
  );
};

export default FeedbackCard;
