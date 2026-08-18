import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("Post Scheduler", () => {
  test("renders the calendar application", () => {
    render(<App />);

    expect(screen.getByText("Post Scheduler")).toBeInTheDocument();
    expect(screen.getByText("Content Calendar")).toBeInTheDocument();
    expect(screen.getByText("Total Posts")).toBeInTheDocument();
  });

  test("shows initial posts", () => {
    render(<App />);

    expect(screen.getByText("Instagram Post")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn Post")).toBeInTheDocument();
    expect(screen.getByText("Facebook Post")).toBeInTheDocument();
  });
});