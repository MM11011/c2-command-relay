import React from "react";
import "./AgentTags.css";

function AgentTags({ tags }) {
  return (
    <div className="agent-tags">
      {tags.map((tag, idx) => (
        <span key={idx} className="tag-badge">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default AgentTags;
