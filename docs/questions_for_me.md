## Thursday, Oct 30 3-430PM

https://servicetitan.zoom.us/j/97284495615

### Questions for me (from ServiceTitan prep guide)

#### What are some basic data structures?

Primarily in JS and react we work with objects and mostly arrays. Booleans are used frequently.

```
Some simple array methods might be something like:

array.map((item) => <div>item.name</div>)

array.sort((a,b) => a - b) /* ascending sort */
array.sort((a,b) => b - a) /* descending sort */

array.find((item) => item.name === 'foo') /* return item */

array.filter((item) => item.name === 'foo') /* return item(s) */

/* add all items in an array with reduce */
/* acc (accumulator is the callback function)
const sum = array.reduce((acc, item) => {
  return acc + item;
}, 0) // initial value
```

#### JS Algorithms
```
Find highest number:
const arr = [15, 25, 100, 1, 5];
console.log(Math.max(...arr));
console.log(arr.reduce((acc, current) => Math.max(acc, current), -Infinity))

Find an object matching a particular value:
const dict = [
  { name: 'tim', age: 59},
  { name: 'joe', age: 5}
];
const maxAge = dict.reduce((prev, curr) => curr.age > prev.age ? curr : prev);

Key/value looping:
for (const [key, value] of Object.entries(dict)) {
  arr.push({ [key]: value });
}

```
#### What is a higher order function?

A higher order function is a function that returns a function generally by accepting a function as an argument/param. This is a pattern for code reusability and ensuring DRY principles.

```
const doMath(number, operation) => operation(number); /* Higher order function */
const double = (number) => number * 2;
const square = (number) => number * number;

const doubleNumber = doMath(5, double);
const squareNumber = doMath(5, square);
```

#### How does the JS event loop work (callbacks/promises/etc)?

Because JS is single threaded, this determines when and how to run specific code.

This has to do with the JS callstack. Functions get pushed onto the stack when called and popped off when they return/exit. You do not want to block the call stack or nothing else will run.

The event loop constantly monitors the call stack to determine what to run.

Promises run before callbacks if they are both in the stack waiting to be called by the event loop. (Microtasks(promises) always run before the next macro task(callbacks)) to ensure smooth async operation. Promises and callbacks are fired by webAPIs.

```
console.log ("a")
setTimeout(() => console.log("b"), 0);
Promise.resolve().then(() => console.log("c"));
console.log("d");

a
d
c
b
```

If you want to resolve multiple promises at once, pass an array to the Promise.all function

```
const foo = 42;
const foo2 = Promise.resolve(10);
const foo3 = new Promise((resolve) => setTimeout(() => {resolve(10)}, 1000));
const result = await Promise.all([foo, foo2, foo3]);
console.log(result);
```

#### Basic fetch example
```
const getData = async (url) => {
  const result = await fetch(url).then((response) => response.json()).then((data) => data);
  return result;
}

const data = getData('https://pokeapi.co/api/v2/pokemon/ditto').then((data) => {
  console.log(data);
});
```
#### React tooling/frameworks/setup

Projects are built using vite.
Use React, with typescript as a base for all projects.
Styling is generally tailwind, with a UI toolkit ontop of it-- material ui, shadcn, etc.
API calls are handled via tanstack react query in a react hook

```
Suppose an API that requires a session id,

/* Component - MyComponent.tsx */
import useDemoAPI from '../hooks/useDemoAPI';
const session = 'demoSessionXYZ123';
const { data } = useDemoAPI({ session });

/* Hook - useDemoAPI.tsx */

/* Types */
interface DemoAPIParams {
  session: string;
}
interface DemoAPIResult {
  name: string;
  version: number;
}

/* The API call for useQuery */
const getDemoAPIData = (session: string) => async () => {
  const { data } = await axios.get<DemoAPIResult>(
    `/api/demoapi`,
    {
      headers: {
        session
      }
    }
  );
  return data;
}

/* The hook itself */
const useDemoAPI = ({ session }: DemoAPIParams): UseQueryResult<DemoAPIResult, AxiosError> => {
  return useQuery({
    queryKey: ['DEMOAPI', session],
    queryFn: getDemoAPIData(session),
    refetchInterval: 10000,
    refetchOnMount: true
  });
}
```

#### State management in React

State management can be handled a variety of ways depending upon what the need is for a global, shared store, or if the state is localized in it's own component.

Local state, react context, localstorage, or zustand are all viable state management approaches.

```
/* Using local state */
const [myState, setMyState] = useState(false); /* Initialize state */
onClick(() => setMyState(!myState)); /* Toggle state boolean */
```

```
/* Using React context */

/* app.tsx */
const userData = {
  name: 'user123',
  locale: 'en'
}
import { createContext } from 'react';
const { UserContext } = createContext(userData);

<UserContext.Provider value={userData}>
  <App />
</UserContext.Provider>


/* button, functional component, etc */
import { useContext } from 'react';
import { UserContext } from './UserContext' /* assuming UserContext file */

const MyComponent = () => {
  const user = useContext(UserContext);
  return <div>{{user.name}}</div>;
}
```

```
/* Using localstorage */
const appData = {
  name: 'test app',
  version: 10.1
}
localStorage.setItem('appData', JSON.stringify(appData)); /* JSON.parse() to use */
```

Finally, for a better solution use Zustand and create a global store which can be used across the entire app, and can have methods/functions, variables, reducers, etc bolted onto it for consumption.

```

```
