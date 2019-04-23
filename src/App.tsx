import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import images from "./images.json";
import { reorderRows, reorder } from "./reorder";
import { Row } from "./types";
import { AuthorList } from "./AuthorList";

const aId = generate();

const App = () => {
  const [rows, setRows] = React.useState<Row[]>([
    { id: aId, label: "a", urls: [] },
    {
      id: "unranked",
      label: "unranked",
      urls: Object.values(images)
    }
  ]);

  React.useEffect(() => {
    const tl = localStorage.getItem("tier-list");

    if (tl) {
      setRows(JSON.parse(tl));
      return;
    }

    // fetch("http://localhost:4000").then(x =>
    //   x.json().then(y => {
    //     setRows([
    //       ...rows,
    //       {
    //         id: "unranked",
    //         label: "unranked",
    //         urls: y.files.map(
    //           (x: string) => `http://localhost:4000/images/${x}`
    //         )
    //       }
    //     ]);
    //   })
    // );
  }, []);

  React.useEffect(() => {
    localStorage.setItem("tier-list", JSON.stringify(rows));
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
        <button
          style={{ marginLeft: 30 }}
          onClick={() => {
            const yes = window.confirm("all data will be lost :)");
            if (yes) {
              localStorage.setItem("tier-list", "");
              window.location.reload();
            }
          }}
        >
          reset
        </button>
        {rows.map((row, i) => (
          <AuthorList
            internalScroll
            key={row.id}
            listId={row.id}
            listType="CARD"
            row={row}
            onLabelChange={text => {
              setRows(
                rows.map(r => (r.id === row.id ? { ...r, label: text } : r))
              );
            }}
            remove={() => {
              setRows(
                rows
                  .filter(x => x.id !== row.id)
                  .map(x =>
                    x.id === "unranked"
                      ? { ...x, urls: [...row.urls, ...x.urls] }
                      : x
                  )
              );
            }}
            up={() => {
              setRows(reorder(rows, i, i - 1));
            }}
            down={() => {
              setRows(reorder(rows, i, i + 1));
            }}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
