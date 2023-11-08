import FeedbackCard from "./FeedbackCard";
import configuration from "src/configuration";

const FeedbackList = () => {
  return (
    <div className="flex flex-row py-10 px-5 w-full flex-wrap justify-center">
      {configuration.feedback.map((card, index) => (
        <FeedbackCard
          avatarUrl={card.avatarUrl}
          name={card.name}
          rating={card.rating}
          comment={card.comment}
          key={index}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
