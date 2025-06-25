export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata", // Force IST
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
