import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "./types";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  onUp: () => void;
  onDown: () => void;
  onLabelChange: (newText: string) => void;
}

export const AuthorList: React.FC<Props> = ({
  listId,
  listType,
  row,
  onDown,
  onUp,
  onLabelChange
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <div>
          <button onClick={onUp}>up</button>
        </div>
        <input
          value={row.label}
          onChange={e => onLabelChange(e.target.value)}
        />
        <div>
          <button onClick={onDown}>down</button>
        </div>
      </div>
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {dropProvided => (
          <div
            {...dropProvided.droppableProps}
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "pink",
              margin: 20,
              minHeight: 60,
              overflowX: "auto"
            }}
            ref={dropProvided.innerRef}
          >
            {row.urls.map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <img style={{ width: 50 }} src={url} />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
