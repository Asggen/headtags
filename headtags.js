import { useEffect } from "react";

function HeadTags({ title, description, keywords, context }) {
  useEffect(() => {
    // Update the document title
    if (typeof document !== "undefined") {
      document.title = title;

      // Update or create meta tags
      updateMetaTag("title", title);
      updateMetaTag("description", description);
      updateMetaTag("keywords", keywords);
    }
  }, [title, description, keywords]);

  // If running in SSR, update the context
  if (context) {
    context.title = title;
    context.description = description;
    context.keywords = keywords;
  }
}

// Helper function to update or create meta tags
function updateMetaTag(name, content) {
  if (content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (tag) {
      tag.setAttribute("content", content);
    } else {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    }
  }
}

export default HeadTags;
