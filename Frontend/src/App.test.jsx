import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders vite + react heading", () => {
  render(<App />);
  expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
});
