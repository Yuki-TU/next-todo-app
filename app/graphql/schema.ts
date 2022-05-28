import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";

/**
 * nexusのスキーマーの設定
 */
export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(
      // 型定義ファイル
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    //graphql/context.tsファイルを指定
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});
