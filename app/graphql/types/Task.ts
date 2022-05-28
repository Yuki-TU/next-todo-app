import { objectType, extendType } from "nexus";

// データの型を設定
export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id", { description: "タスクのid" });
    t.nonNull.string("title", { description: "タスクのタイトル" });
    t.nonNull.boolean("done", { description: "完了フラグ" });
  },
});

// 返すデータを設定
export const TasksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("tasks", {
      type: "Task",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany(); // データベースの値を返す
      },
    });
  },
});
