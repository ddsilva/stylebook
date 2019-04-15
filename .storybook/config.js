import * as React from "react"
import { configure, addDecorator } from "@storybook/react"
import { linkTo } from "@storybook/addon-links"
import { withManager } from "../src/decorators"
import { StoriesProvider } from "../src/components"

const req = require.context("../stories", true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

const Test = (
  <StoriesProvider>
    {stories => (
      <ul>
        {stories.map(story => (
          <li key={story.kind}>
            <span>{story.kind}</span>
            <ul>
              {story.stories.map(substory => (
                <li key={substory.name}>
                  <button onClick={linkTo(story.kind, substory.name)}>
                    {substory.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )}
  </StoriesProvider>
)

const options = {
  component: Test
}

configure(loadStories, module)
addDecorator(withManager(options))
