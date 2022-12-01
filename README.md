## WallaTest

[https://walla-test.vercel.app](https://walla-test.vercel.app)

### To run the project, install the dependencies and run the following commands (Using node 16.x):

```bash
pnpm dev or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

### In order to run the tests, run the following command:

```bash
pnpm test or npm run test
```

### For the E2E tests, run the following command:

```bash
pnpm test:e2e or npm run test:e2e
```

## Project features

- [x] Single Page Application with SSR.
- [x] Product list with pagination (5 items per page).
- [x] The user can search for a product by name, description, price or email.
- [x] The user can order the products by name, description, price or email.
- [x] The user can mark a product as favorite.
- [x] The user can view a modal with the favorite products and remove them from the list.

## Project structure

The project is divided into these main folders:

- `components`: All the components used in the project.
- `pages`: There are 2 pages: `index` and `search`.
    - `index`: Contains the main product listing of the project, using the ProductList component.
    - `search`: Contains the search results of the query present in the URL, also using the ProductList component.
- `lib`: Fetching logic for CSR and SSR and debounce utility.
- `hooks`:
  - `useFetchProducts`: Hook to fetch the products from the API client side (for the pagination).
  - `useInfiniteScroll`: Hook that returns a ref to be attached to the last element of a list, and trigger a callback whenever the element is in the viewport.
- `context`: Contains the context in order to have a global state for the Favorites.

## Project decisions

- I decided to use Next.js 13, altought I'm not using the new `app` folder because it's still in beta and has some missing features needed for this project, I think it's a very good fit for creating a product listing page. One of it's main features is the SSR, which ensures a very good firs load performance, as the page is rendered on the server side and the client side only hydrates the page while the user can start interacting with it. Using the `next` provided components like `Link` and `Image`, we can create a better user experience, as the user can navigate through the pages without having to reload, and the images are lazy loaded, which improves greatly the user experience.

- It uses TypeScript as for me it's a default for any project in order to have a consistent, maintainable and scalable codebase that documents itself, and it avoids bugs. In conjuction with Prettier and ESLint, it makes the code very readable and easy to maintain.

- With the usage of TailwindCSS, I can create a very consistent design system, and it's very easy to use and maintain, as the classes are self explanatory. It also has very good utilities for responsive design, as it's a utility-first CSS framework, and it's very easy to iterate, perfect for the first steps of any project. I thought about using StyledComponents or SyledModules but I think that I can iterate better with Tailwind and, when the project grows, I can always migrate to StyledComponents very easily, in order to have a more consistent and maintainable codebase.

- Appart from NextJS, Tailwind I decided to not use any other library to not bloat the project and keep it as simple and small as possible.

- Using Jest and React Testing Library, I can create unit tests for the components and the hooks. This combination allows to build very fast, consistent and reliable tests, and it's very easy to maintain and understand, for me it's one of the best combinations for testing React components.

- For the E2E tests, I used Playwright, which is a very good tool for E2E testing, as it's very fast, reliable and easy to use. It's also very easy to maintain and understand, as it's very similar to the React Testing Library. One of it's main advantatges is that it's fully cross-browser, and it can be used for both desktop and mobile testing.

- Instead of loading the whole list of products in the first render, I decided to create a NextJS API route that simulates the interaction with a real API. This way, whenever we exit the testing phase we can just change the testing API URL for the real one and it will work without any changes in the code. One of the main advantatges of having a NextJS API route is that we can have a single source of truth for the data. I tought of loading the whole product list and then render it but with my experience, I think that's not a realistic approach and as soon as we want to have real data, we will have to fetch it in chunks from some API, so I decided to simulate that from the beginning. In the future, using `usSWR` or `tRPC` libraries can be a good approach to have a more featured and typesafe data fetching.

- I used Pnpm as the package manager, as it's very fast and reliable, and it's very easy to use. It also has a very good integration with Vercel, as it's their default package manager. Also, it's very easy to migrate to NPM if needed.
