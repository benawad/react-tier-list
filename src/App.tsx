import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import images from "./images.json";
import { reorderRows, reorder } from "./reorder";
import { AuthorList } from "./AuthorList";

const aId = generate();
const unrankedId = generate();

const App = () => {
  const [rows, setRows] = React.useState([
    { id: aId, label: "a", urls: [] },
    {
      id: unrankedId,
      label: "unranked",
      urls: images
    }
  ]);

  React.useEffect(() => {
    const data = localStorage.getItem("my-tier-list");
    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("my-tier-list", JSON.stringify(rows));
  });

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
        {rows.map((row, i) => (
          <AuthorList
            onLabelChange={newText =>
              setRows(
                rows.map(x =>
                  x.id === row.id ? { ...row, label: newText } : x
                )
              )
            }
            onUp={() => setRows(reorder(rows, i, i - 1))}
            onDown={() => setRows(reorder(rows, i, i + 1))}
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
