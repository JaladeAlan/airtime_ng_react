export default function handleApiError(err, setError) { 
  console.log("🔥 Full error object:", err);

  if (!err.response) {
    console.error("Network or CORS error:", err);
    setError("Network error — please check your connection.");
    return;
  }

  const data = err.response.data;
  console.log("📦 Response data:", data);

  // If data is a string, show it
  if (typeof data === "string") {
    setError(data);
    return;
  }

  // If there are validation errors
  if (data?.errors) {
    const allErrors = Object.values(data.errors).flat();
    const formatted = allErrors.join("\n");
    setError(formatted || data.message || "Validation failed.");
    return;
  }

  // If backend uses `text` property
  if (data?.text) {
    setError(data.text); // <-- use the string
    return;
  }

  // If backend uses `message` or `error`
  if (data?.message || data?.error) {
    setError(data.message || data.error || "Something went wrong.");
    return;
  }

  setError("Something went wrong. Please try again.");
}
