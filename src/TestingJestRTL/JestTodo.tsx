import axios from 'axios';
import React, { useState } from 'react';
import './JestTodo.css';

interface User {
  [key: string]: string;
}

const JestTodo: React.FC = () => {
  const [elems, setElems] = useState<Array<string>>([]);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChaneInput = (event: { target: HTMLInputElement }) =>
    setValue(event.target.value);

  const handleAddToDo = () => {
    setElems([...elems, value]);
    setValue('');
  };

  const handleRemoveToDo = (indexElement: number) =>
    setElems(elems.filter((e: string, i: number) => i !== indexElement));

  const loadElements = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response: { data: Array<User> }) => {
        setElems([...elems, ...response.data.map((user: User) => user.name)]);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className="wrapper">
      <div className="inputWrapper">
        <input
          className="input"
          type="text"
          placeholder="Enter text..."
          value={value}
          onChange={(e) => handleChaneInput(e)}
        />
        <div
          role="button"
          className="removeButton"
          onClick={() => setValue('')}
        >
          X
        </div>
        <button className="addButton" onClick={handleAddToDo}>
          Add ToDo
        </button>
      </div>
      <ul className="list">
        {elems.map((element: string, index: number) => (
          <li className="element" key={`${index + Math.random()}`}>
            {element}
            <div
              role="button"
              className="removeElement"
              onClick={() => handleRemoveToDo(index)}
            >
              Delete ToDo
            </div>
          </li>
        ))}
      </ul>
      {error && <p>Error load data</p>}
      <div className="controls">
        <button onClick={() => loadElements()}>Load ToDos</button>
        <button onClick={() => setElems([])}>Clear ToDos</button>
      </div>
    </div>
  );
};

export default JestTodo;
