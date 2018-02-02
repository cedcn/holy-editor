import flow from 'lodash/flow'

const applyMiddleware = (...middlewares) => options => html => {
  const chain = middlewares.map(middleware => middleware(options))

  return flow(chain)(html)
}

export default applyMiddleware

/*
```
  const htmlHandle = applyMiddleware(a, b)
  htmlHandle(options)(html)
``
*/
