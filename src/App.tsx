import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./reorder";
import { ColorMap } from "./types";
import { AuthorList } from "./AuthorList";

const aId = generate();
const unrankedId = generate();

const App = () => {
  const [rows, setRows] = React.useState([
    { id: aId, label: "a", urls: [] },
    {
      id: unrankedId,
      label: "unranked",
      urls: [
        "https://www.ssbwiki.com/images/thumb/b/b3/Olimar_SSBU.png/500px-Olimar_SSBU.png",
        "https://www.ssbwiki.com/images/thumb/b/b0/Olimar-Alt4_SSBU.png/500px-Olimar-Alt4_SSBU.png"
      ]
    }
  ]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setRows(reorderRows(rows, source, destination));
      }}
    >
      <div>
        <button
          onClick={() => {
            setRows([
              {
                id: generate(),
                label: "",
                urls: []
              },
              ...rows
            ]);
          }}
        >
          add row
        </button>
        {rows.map(row => (
          <AuthorList
            internalScroll
            key={row.id}
            listId={row.id}
            listType="CARD"
            row={row}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
