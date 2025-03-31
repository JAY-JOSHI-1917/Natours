export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB").split("/").join("-"); // Format as dd-mm-yyyy
  };