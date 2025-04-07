import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("pokemon/:name", "./routes/PokemonDetail.tsx")
] satisfies RouteConfig;
