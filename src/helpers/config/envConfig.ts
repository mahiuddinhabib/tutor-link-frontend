export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    // "https://tutor-link-backend.vercel.app/api/v1"
    "http://localhost:5000/api/v1"
  );
};
