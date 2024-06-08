"use client";

import React, { useContext, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager, StyleSheetContext } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  const { styleSheet: clientStyleSheet } = useContext(StyleSheetContext);
  
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return (
      <>
        {styles}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.SC_SS?.rehydrate?.()`
          }}
        ></script>
      </>
    );
  });

  if (typeof window !== "undefined") {
    window.SC_SS = clientStyleSheet;
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
