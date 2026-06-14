const { useEffect } = require("react");

function HeadTags({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  tagIDs,
  tagNames,
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
      updateOgTag("og:type", type);

      updateDataLayer({
      title,
      url,
      type,
      tagIDs,
      tagNames,
      });
    }
  }, [title, description, keywords, image, url, type, tagIDs, tagNames]);

  /* =========================
     SSR CONTEXT
  ========================= */
  if (context) {
    context.title = title;
    context.description = description;
    context.keywords = keywords;
    context.image = image;
    context.url = url;
    context.type = type;
    context.tagIDs = tagIDs;
    context.tagNames = tagNames;
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

/* =========================
   DATA LAYER FOR ANALYTICS
========================= */

function updateDataLayer({
  title,
  url,
  type,
  tagIDs = [],
  tagNames = [],
}) {
  let script = document.getElementById("data-layer");

  const data = {
    page: {
      pageName: title,
      pagePath: url,
      pageType: type,
      category: {
        tags: {
          tagIDs,
          tagNames,
        },
      },
    },
  };

  if (!script) {
    script = document.createElement("script");

    script.id = "data-layer";
    script.type = "application/json";

    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

module.exports = HeadTags;