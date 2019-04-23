import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "./types";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  onLabelChange: (text: string) => void;
  up: () => void;
  down: () => void;
  remove: () => void;
}

export const AuthorList: React.FC<Props> = ({
  listId,
  listType,
  row,
  onLabelChange,
  up,
  down,
  remove
}) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {dropProvided => (
        <div {...dropProvided.droppableProps}>
          <div
            style={{
              display: "flex",
              backgroundColor: "pink",
              margin: 20,
              minHeight: 120,
              overflowX: "auto"
            }}
            ref={dropProvided.innerRef}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <button onClick={up}>up</button>
                <input
                  style={{ fontSize: 18 }}
                  value={row.label}
                  onChange={e => onLabelChange(e.target.value)}
                />
                <button onClick={down}>down</button>
              </div>
              {row.id !== "unranked" && (
                <button onClick={remove}>remove</button>
              )}
            </div>
            {row.urls.slice(0, 100).map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <img style={{ width: 100 }} src={url} />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
