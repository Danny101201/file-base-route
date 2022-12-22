import { Fragment, lazy, Suspense } from 'react'
import { Routes as BrowserRoutes, Route } from 'react-router-dom'

const PRESERVED = import.meta.glob('/src/pages/(_app|404).tsx')
const ROUTES = import.meta.glob('/src/pages/**/[a-z[]*.tsx')
const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, '')
  // @ts-ignore
  return { ...preserved, [key]: PRESERVED[file].default }
}, {}) as Record<string, string>
const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*') //[...params]
    .replace(/\[(.+)\]/, ':$1')//[params]
  // @ts-ignore
  return { path, component: lazy(ROUTES[route]) }
})
console.log({ routes })
export const Routes = () => {
  const App = preserved?.['_app'] || Fragment
  const NotFound = preserved?.['404'] || Fragment

  return (
    <App>
      <Suspense fallback={'Loading...'}>
        <BrowserRoutes>
          {routes.map(({ path, component: Component = Fragment }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </BrowserRoutes>
      </Suspense>
    </App>
  )
}