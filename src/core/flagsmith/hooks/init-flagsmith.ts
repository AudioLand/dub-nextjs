import flagsmith from "flagsmith";

const initFlagsmith = () => {
  const apiKey = process.env.NEXT_PUBLIC_FLAGSMITH_API_KEY;

  if (!apiKey) {
    throw new Error("Flagsmith API key is not defined");
  } else {
    flagsmith
      .init({
        environmentID: apiKey,
      })
      .catch((error) => {
        console.error("Failed to initialize Flagsmith:", error);
      });
  }
};

export default initFlagsmith;
