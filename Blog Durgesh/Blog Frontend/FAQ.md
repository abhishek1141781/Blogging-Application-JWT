1) 
PROBLEM: differnce between {} and normal import

import { Button } from 'reactstrap';
import Base from './components/Base';

SOLUTION:
a)Named Imports (with {}):

Named imports allow you to selectively import specific exports from a module. You wrap the imported items in curly braces {} and specify the name of the export you want to import.
This is typically used when the source module exports multiple items, and you only need one or a few of them.
```
import { Button } from 'reactstrap'; // Importing the 'Button' export from the 'reactstrap' module
```
Named imports are used when there are multiple named exports in a module, and you want to import specific ones by name.



b)Default Imports (without {}):

Default imports are used when a module or component has a default export. You don't need to use curly braces for default imports; you can choose any name for the imported item.
This is commonly used when there is only one main export in a module.

```
import Base from './components/Base'; // Importing the default export from the 'Base' module
```
Default imports are used when there's a single default export in a module, and you want to import it without specifying a name.

2)PROBLEM: export vs exports




3)
PROBLEM: React.StrictMode

React StrictMode is a React Developer Tool that is used to help developers identify potential issues in a web application. It enables additional deprecation checks and warnings for its child components, runs an extra setup+cleanup cycle for every Effect, and checks for usage of deprecated APIs. StrictMode does not render any visible UI. It can be thought of as a utility component that allows developers to code more efficiently while also alerting them to any questionable code added to the application by accident.

4) useEffect vs useState



5)
Error Handling in ReactJs || Using Backend errors and showing them in the frontend



6)
Us having to refresh the page after logging in so as to get the redering of logout onto the Navbar








