import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderColors } from "./reorder";
import { ColorMap } from "./types";
import { AuthorList } from "./AuthorList";

const App = () => {
  const [colorMap, setColors] = React.useState<ColorMap>({
    a: ["blue", "red", "yellow"],
    b: ["pink"],
    c: ["green", "tan"]
  });

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setColors(reorderColors(colorMap, source, destination));
      }}
    >
      <div>
        {Object.entries(colorMap).map(([k, v]) => (
          <AuthorList
            internalScroll
            key={k}
            listId={k}
            listType="CARD"
            colors={v}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
