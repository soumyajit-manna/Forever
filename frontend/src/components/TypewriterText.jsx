import React, { useEffect, useState } from "react";

const TypewriterText = ({
  text,
  delay = 0,
  as: Element = "span",
  className,
  renderText,
}) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let timeoutId;
    let characterIndex = 0;
    let isDeleting = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleText(text);
      return undefined;
    }

    const typeNextCharacter = () => {
      if (!isDeleting) {
        characterIndex += 1;
        setVisibleText(text.slice(0, characterIndex));

        if (characterIndex === text.length) {
          isDeleting = true;
          timeoutId = window.setTimeout(typeNextCharacter, 1800);
          return;
        }

        timeoutId = window.setTimeout(typeNextCharacter, 32);
        return;
      }

      characterIndex -= 1;
      setVisibleText(text.slice(0, characterIndex));

      if (characterIndex === 0) {
        isDeleting = false;
        timeoutId = window.setTimeout(typeNextCharacter, 500);
        return;
      }

      timeoutId = window.setTimeout(typeNextCharacter, 14);
    };

    const startTimeoutId = window.setTimeout(typeNextCharacter, delay);

    return () => {
      window.clearTimeout(startTimeoutId);
      window.clearTimeout(timeoutId);
    };
  }, [text, delay]);

  const caret = <span className="typewriter-caret" />;

  return (
    <Element className={className}>
      <span className="typewriter-sr-only">{text}</span>
      <span aria-hidden="true">
        {renderText ? (
          renderText(visibleText, caret)
        ) : (
          <>
            {visibleText}
            {caret}
          </>
        )}
      </span>
    </Element>
  );
};

export default TypewriterText;
