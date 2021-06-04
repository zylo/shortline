# shortline

Front-end code challenge

## Install Node (if not already installed on your machine):

1.  `brew install nvm`
2.  Add the following to $HOME/.bashrc, $HOME/.zshrc, or your shell's
    equivalent configuration file:
    `sh source $(brew --prefix nvm)/nvm.sh export NVM_DIR=~/.nvm`
3.  use nvm to install and setup node
    ```sh
    nvm install node;
    nvm use node;
    ```

## Setup:

1.  Clone the shortline repo `git clone git@github.com:zylo/shortline.git`
2.  Navigate into the project `cd shortline`
3.  Create your own code challenge branch `git checkout -b [whatever_you_want_to_name_your_branch]`
4.  Install dependencies and start the app on localhost `npm install` and `npm start` and open http://localhost:3000 your browser

## Code Submission

1.  Create a private repository on your github account.
2.  Invite github users jtcarder, foxtrottwist & wolsieferm as collaborators in the settings of your private repo.
3.  Push commits to your code challenge branch of your private repo.
4.  Open a pull request in your private repo comparing your code challenge branch against `master`

## Code Standards:

### Static code analysis

ESlint is used to ensure code standards are maintained

- `npm run lint` - lints entire project
- `npm run lint:changes` - lints only changes (off of master)
- For live-linting in your editor use:

  | Editor  | Plugin/Extension                                                           |
  | ------- | -------------------------------------------------------------------------- |
  | Atom    | https://atom.io/packages/linter-eslint                                     |
  | Sublime | https://github.com/roadhump/SublimeLinter-eslint                           |
  | VS Code | https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint |

Prettier is used for automatic code-formatting. It will auto-format any new or changed files at time of commit.

- **Warning:** To avoid conflicts, disable any other editor plugins that enforce code style, e.g. Beautify
- For auto-formatting on save, install and configure the integration for your editor.

  | Editor  | Plugin                                                                                        | Enable for MG Only                                                     |
  | ------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
  | Atom    | [atom-prettier](https://atom.io/packages/prettier-atom)                                       | toggle in plugin settings ui                                           |
  | Sublime | [JsPrettier](https://packagecontrol.io/packages/JsPrettier)                                   | set `auto_format_on_save_requires_prettier_config` to true in Settings |
  | VS Code | [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | add `"editor.formatOnSave: true"` to Workspace Settings                |
  | Other   | [Editor integration list](https://prettier.io/docs/en/editors.html)                           |                                                                        |

### Unit/Integration Tests

Install Jest CLI with `npm install -g jest-cli`

- run all tests `npm run test`
- run tests in one file or those that match a regex across all files
  - `jest client/{path to test}/{test name}.jsx`

### Components with Context and API Calls

When need to access `contexts` or make api calls, we use the `useDataLayer` pattern, as demonstrated below. This allows the main component itself to be cleaner, more resilient to change and easier to test. It consists of a wrapping component, a `_DisplayLayer` component and a custom hook (`useDataLayer`) that accesses `contexts`, makes api calls and manages state.

The wrapping component is what is consumed by other components and serves as a layer where props can be passed to the `_DisplayLayer` whether from the consuming component or most importantly from the custom hook, `useDataLayer`.

```jsx
// MyComponent.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'clsx';
import PropTypes from 'prop-types';
import { useMadeUpContextUpdate } from './madeUpContext'
import SomeComponent from '../../components/SomeComponent';
import { xhrRequest } from '../../utilities/helpers';

export default function MyComponent(props) {
  return <MyComponent_DisplayLayer {...useDataLayer()} {...props} />

}

MyComponent.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  shouldDoAThing: PropTypes.bool
}

export function MyComponent_DisplayLayer({ className, data, description } ) {
  return shouldDoAThing ? (
    <div className={classNames('styles-styles',  className )}
      <SomeComponent data={data} />
    </div>
  ) : null;
}

MyComponent_DisplayLayer.propTypes = {
 className: PropTypes.string,
 description: PropTypes.string,
 data: PropTypes.arrayOf(PropTypes.shape({})),
 shouldDoAThing: PropTypes.bool
}

function useDataLayer(param) {
  const { doSomething } = useMadeUpContextUpdate();
  const [data, setData] = useState(null);

  useEffect(() => {
     xhrRequest.get('https://somerandomsite/com/api').then(({ body }) => {
      setData(body));
    });
  }, [param])

  return {
    data
  }
}
```
