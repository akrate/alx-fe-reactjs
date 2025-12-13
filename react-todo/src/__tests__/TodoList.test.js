import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    const todos = screen.getAllByTestId("todo-item");
    expect(todos.length).toBe(3);
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "New Todo" } });

    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");
    expect(todo).not.toHaveStyle("text-decoration: line-through");

    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);

    const todo = screen.getByText("Write Tests");
    const deleteButton = todo.querySelector("button");

    fireEvent.click(deleteButton);

    expect(todo).not.toBeInTheDocument();
  });
});
