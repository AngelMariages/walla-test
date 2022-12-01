## WallaTest

[https://walla-test.vercel.app](https://walla-test.vercel.app)

To run the project, install the dependencies and run the following commands:

```bash
pnpm dev or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

In order to run the tests, run the following command:

```bash
pnpm test or npm run test
```

For the E2E tests, run the following command:

```bash
pnpm test:e2e or npm run test:e2e
```

## Project requirements
- [x] It needs to be a SPA
- [x] Product list with pagination (5 items per page)
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
- `lib`: Fetching logic for CSR and SSR.
- `hooks`:
  - `useFetchProducts`: Hook to fetch the products from the API client side (for the pagination).
  - `useInfiniteScroll`: Hook that returns a ref to be attached to the last element of a list, and trigger a callback whenever the element is in the viewport.
- `context`: Contains the context in order to have a global state for the Favorites.
