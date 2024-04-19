import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { GET_SONGS } from "./queries";

const mocks = [
  {
    request: {
      query: GET_SONGS,
    },
    result: {
      data: { songs: [{ name: "song-1", title: "Song 1", seconds: 123 }] },
    },
  },
];

describe("App", () => {
  it("should render OK", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>,
    );
    const linkElement = screen.getByText(/Try GraphQL/i);
    expect(linkElement).toBeInTheDocument();
    expect(await screen.findByText("Song 1")).toBeInTheDocument();
  });
});
