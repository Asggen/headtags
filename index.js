const { useEffect } = require("react");

function HeadTags({
  title,
  description,
  keywords,
  image,
  url,
  context,
}) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      /* =========================
         TITLE
      ========================= */
      document.title = title;

      /* =========================
         NORMAL META TAGS
      ========================= */
      updateMetaTag("title", title);
      updateMetaTag("description", description);
      updateMetaTag("keywords", keywords);

      /* =========================
         OPEN GRAPH TAGS
      ========================= */
      updateOgTag("og:title", title);
      updateOgTag("og:description", description);
      updateOgTag("og:image", image);
      updateOgTag("og:url", url);
      updateOgTag("og:type", "website");
    }
  }, [title, description, keywords, image, url]);

  /* =========================
     SSR CONTEXT
  ========================= */
  if (context) {
    context.title = title;
    context.description = description;
    context.keywords = keywords;
    context.image = image;
    context.url = url;
  }
}

/* =========================
   NORMAL META TAGS
========================= */

function updateMetaTag(name, content) {
  if (!content) return;

  let tag = document.querySelector(
    `meta[name="${name}"]`
  );

  if (tag) {
    tag.setAttribute("content", content);
  } else {
    tag = document.createElement("meta");

    tag.setAttribute("name", name);
    tag.setAttribute("content", content);

    document.head.appendChild(tag);
  }
}

/* =========================
   OG TAGS
========================= */

function updateOgTag(property, content) {
  if (!content) return;

  let tag = document.querySelector(
    `meta[property="${property}"]`
  );

  if (tag) {
    tag.setAttribute("content", content);
  } else {
    tag = document.createElement("meta");

    tag.setAttribute("property", property);
    tag.setAttribute("content", content);

    document.head.appendChild(tag);
  }
}

module.exports = HeadTags;