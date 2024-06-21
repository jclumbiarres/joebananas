import { Hono } from "hono";
import { html } from "hono/html";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

const Layout = ({ children }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@2.0.0"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Ejemplo de SSR</title>
    </head>
    <body>
      ${Header()}
      <div id="root">${children}</div>
    </body>
  </html>
`;

const Header = () => {
  return (
    <div class="bg-gray-800 py-4">
      <nav class="container mx-auto flex justify-between items-center">
        <a
          href="#"
          hx-get="/home"
          hx-target="#root"
          class="text-white text-lg font-bold"
        >
          Home
        </a>
        <a
          href="#"
          hx-get="/about"
          hx-target="#root"
          class="text-white text-lg font-bold"
        >
          About
        </a>
        <a
          href="#"
          hx-get="/contact"
          hx-target="#root"
          class="text-white text-lg font-bold"
        >
          Contact
        </a>
      </nav>
    </div>
  );
};

const Content = async () => {
  const salida = await fetcheaInfo(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  return (
    <Layout>
      <h1 class="text-5xl">Hello Hono!</h1>
      <p>
        This is a simple example of how to use Hono to create a web application.
      </p>
      <p>
        <strong>Fetch data from API:</strong>
        <br />
        {salida}
      </p>
    </Layout>
  );
};

app.get("/", (c) => {
  return c.html(<Content />);
});

app.get("/home", (c) => {
  return c.html(
    <>
      <h1 class="text-5xl">Home</h1>
      <p>This is the home page</p>
    </>
  );
});

app.get("/contact", (c) => {
  return c.html(
    <>
      <h1 class="text-5xl">Contact</h1>
      <p>This is the contact page</p>
    </>
  );
});

app.get("/about", (c) => {
  return c.html(
    <>
      <h1 class="text-5xl">About</h1>
      <p>This is the about page</p>
    </>
  );
});

const fetcheaInfo = async (url: string) => {
  const response = await fetch(url);
  return response.text();
};

export default app;
