import flagsmith from "flagsmith";

const initFlagsmith = async () => {
  const apiKey = process.env.NEXT_PUBLIC_FLAGSMITH_API_KEY;

  if (apiKey) {
    await flagsmith
      .init({
        environmentID: apiKey,
        fetch,
      })
      .catch((error) => {
        console.error("Failed to initialize Flagsmith:", error);
      });
  } else {
    throw new Error("Flagsmith API key is not defined");
  }
};

export default initFlagsmith;
