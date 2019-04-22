import * as React from "react"
import { configure, addDecorator } from "@storybook/react"
import { linkTo } from "@storybook/addon-links"
import { withManager } from "../src/decorators"
import { StoriesProvider } from "../src/components"
import styled from "styled-components"

const req = require.context("../stories", true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

const Test = styled.ul`
  background-color: red;
`

const Testano = (
  <StoriesProvider>
    {stories => (
      <Test>
        {stories.map(story => (
          <li key={story.kind}>
            <span>{story.kind}</span>
            <Test>
              {story.stories.map(substory => (
                <li key={substory.name}>
                  <button onClick={linkTo(story.kind, substory.name)}>
                    {substory.name}
                  </button>
                </li>
              ))}
            </Test>
          </li>
        ))}
      </Test>
    )}
  </StoriesProvider>
)

const options = {
  component: Testano
}

configure(loadStories, module)
addDecorator(withManager(options))
