import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import JestTodo from './JestTodo';

test('renders button', () => {
  render(<JestTodo />);
  const button = screen.getByText(/Add ToDo/i);
  expect(button).toBeInTheDocument();
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const todos = [
  { name: 'ToDo 1' },
  { name: 'ToDo 2' },
  { name: 'ToDo 3' },
  { name: 'ToDo 4' },
  { name: 'ToDo 5' },
  { name: 'ToDo 6' },
  { name: 'ToDo 7' },
  { name: 'ToDo 8' },
  { name: 'ToDo 9' },
  { name: 'ToDo 10' },
];

const setup = () => {
  const utils = render(<JestTodo />);
  const input = utils.getByPlaceholderText('Enter text...');
  const buttonClearInput = utils.getByText('X');
  const buttonAddElement = utils.getByRole('button', { name: 'Add ToDo' });
  const buttonClearList = utils.getByRole('button', { name: 'Clear ToDos' });
  const buttonLoadElements = utils.getByRole('button', { name: 'Load ToDos' });
  const list = utils.getByRole('list');
  const listItem = utils.queryByRole('listitem');
  const listItems = utils.queryAllByRole('listitem');

  return {
    input,
    buttonClearInput,
    buttonAddElement,
    buttonClearList,
    buttonLoadElements,
    list,
    listItem,
    listItems,
    ...utils,
  };
};

describe('General testing component', () => {
  it('Input: enter and clear', () => {
    const { input, buttonClearInput } = setup();
    const text = 'My new ToDo';
    expect((input as HTMLInputElement).value).toBe(''); // Проверка пуст ли инпут
    userEvent.type(input, text); // Ввод значения в интуп
    expect((input as HTMLInputElement).value).toBe(text); // Проверка соответсвия введённых данных
    userEvent.click(buttonClearInput); // Очистка инпута начатием на кнопку очистки значания
    expect(input as HTMLInputElement).toHaveAttribute('value', ''); // проверка на пустоту, как вариант проверки value
  });

  it('Input: enter and add ToDo', async () => {
    const { input, buttonAddElement, listItem, findByRole } = setup();
    const text = 'Купить продукты';
    expect(listItem).toBeNull(); // Проверяем что нет пукта в листе с тудушками
    userEvent.type(input, text); // Ввод значения в интуп
    expect((input as HTMLInputElement).value).toBe(text); // Проверка соответсвия введённых данных
    userEvent.click(buttonAddElement); // Нажатие на кнопку добавления туду в лист
    const newListItem = await findByRole('listitem'); // Ищем туду после обновления стэйта и перерендера
    expect(newListItem).toBeInTheDocument(); // Проврека что туду в документе
    expect(newListItem).toHaveTextContent(text); // Проверка на то что в туду именно тот текст который мы писали в инпут
  });

  it('Todo item: removal from the list', async () => {
    const {
      input,
      buttonAddElement,
      listItem,
      findByRole,
      findByText,
    } = setup();
    const text = 'Купить продукты';
    userEvent.type(input, text); // Ввод значения в интуп
    userEvent.click(buttonAddElement); // Нажатие на кнопку добавления туду в лист
    const newListItem = await findByRole('listitem'); // Ищем туду после обновления стэйта и перерендера
    expect(newListItem).toBeInTheDocument(); // Проврека что туду в документе
    const buttonRemoveItem = await findByText('Delete ToDo'); // Ищем кнопку удаления туду
    userEvent.click(buttonRemoveItem); // Кликаем на кнопку удаления конкретной туду
    expect(listItem).toBeNull(); // Проверяем что нет пукта в листе с тудушками
  });

  it('Todos loading and clear list', async () => {
    const {
      listItems,
      buttonLoadElements,
      buttonClearList,
      findAllByRole,
      findByText,
    } = setup();

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: todos }),
    );
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new TypeError('Promises rejected.')),
    );

    expect(listItems).toEqual([]); // Проверяем что нет ни одной тудшки в листе
    userEvent.click(buttonLoadElements); // Подгружаем новые тудушки

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.get).toHaveBeenCalled(); // Проверяем была ли вызвана функция запроса тудушек
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Проверяем что она была вызвана один раз
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
    ); // Проверяем что функция была вызвана с необходимыми параметрами
    const newTodoItems = await findAllByRole('listitem'); // Ищем погруженные и отрендеринные тудушки
    expect(newTodoItems).toHaveLength(10); // Должно быть 10 штук
    userEvent.click(buttonClearList); // Жмем на очистку листа
    expect(listItems).toHaveLength(0); // Проверяем что нет ни одной тудшки в листе

    userEvent.click(buttonLoadElements); // Второй вызов с ошибкой
    expect(await findByText('Error load data')).toBeInTheDocument();
  });
});
