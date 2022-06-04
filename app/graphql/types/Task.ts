import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  booleanArg,
} from "nexus";

// データの型を設定
export const Task = objectType({
  name: "Task",
  description: "タスク一覧の型定義",
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
      description: "タスク一覧配列を返す",
      type: "Task", // 帰り値の型タイプ
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany(); // データベースの値を返す
      },
    });
  },
});

/**
 * タスクの追加
 */
export const CreateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task", // 型を指定
      description: "タスクの追加",
      args: {
        title: nonNull(stringArg({ description: "タスクのタイトル" })),
      },
      resolve(_parent, args, ctx) {
        // ORMよりデータ尾作成
        return ctx.prisma.task.create({
          data: {
            title: args.title,
          },
        });
      },
    });
  },
});

// タスクの更新
export const UpdateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateTask", {
      type: "Task",
      description: "タスクの完了フラグの更新",
      args: {
        id: nonNull(intArg({ description: "タスクid" })),
        title: nonNull(stringArg({ description: "タイトル" })),
        done: nonNull(booleanArg({ description: "完了フラグ" })),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.title,
            done: args.done,
          },
        });
      },
    });
  },
});

// タスクを削除
export const DeleteTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteTask", {
      type: "Task",
      description: "タスクの削除",
      args: {
        id: nonNull(intArg({ description: "削除したいタスクid" })),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
