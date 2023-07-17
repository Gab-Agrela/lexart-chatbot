export const exportToCsv = (data, filename) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    encodeURI(
      data
        .map((item) => [item.type, item.text, item.dateTime].join(","))
        .join("\n")
    );

  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
