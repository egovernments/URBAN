import React, { useState } from "react";

/**
 * Drop this component anywhere: <Accordion />
 * - No external libraries
 * - Single-open behavior (clicking one closes the others)
 * - Accessible: role="button", aria-expanded, keyboard support (Enter/Space)
 */
export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "Section One",
      content:
        "This is the content for section one. Put any JSX here—lists, links, forms, etc."
    },
    {
      title: "Section Two",
      content:
        "Content for section two. The accordion is controlled so only one stays open at a time."
    },
    {
      title: "Section Three",
      content:
        "Content for section three. Fully inline-styled and responsive by default."
    }
  ];

  const styles = {
    wrapper: {
      maxWidth: "100%",
      margin: "20px auto",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    },
    item: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      marginBottom: 12,
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
    },
    header: (expanded) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "14px 16px",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      textAlign: "left",
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.3,
      outline: "none",
      transition: "background 120ms ease",
      ...(expanded ? { background: "#f9fafb" } : {})
    }),
    chevron: (expanded) => ({
      display: "inline-block",
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 150ms ease",
      marginLeft: 12
    }),
    panelOuter: {
      transition: "max-height 220ms ease",
      overflow: "hidden"
    },
    panelInner: {
      padding: "0 16px 16px",
      color: "#374151",
      fontSize: 15,
      lineHeight: 1.6
    }
  };

  const onToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const onKeyDown = (e, idx) => {
    // support Enter/Space to toggle
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(idx);
    }
  };

  return (
    <div style={styles.wrapper}>
      {items.map((item, idx) => {
        const expanded = openIndex === idx;
        return (
          <div style={styles.item} key={idx}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              aria-controls={`panel-${idx}`}
              onClick={() => onToggle(idx)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              style={styles.header(expanded)}
            >
              <span>{item.title}</span>
              {/* simple chevron without any icon library */}
              <span style={styles.chevron(expanded)}>▾</span>
            </div>

            {/* animated content area (max-height anim) */}
            <div
              id={`panel-${idx}`}
              style={{
                ...styles.panelOuter,
                maxHeight: expanded ? 500 : 0 // adjust if your content is taller
              }}
            >
              <div style={styles.panelInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
