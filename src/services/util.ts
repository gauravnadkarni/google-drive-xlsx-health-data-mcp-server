export const formatToolResponse = (structuredContent: any): any => ({
  content: [
    {
      type: "text",
      text: JSON.stringify(structuredContent, null, 2),
    },
  ],
  structuredContent,
});
