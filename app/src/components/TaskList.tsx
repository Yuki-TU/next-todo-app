import { useMutation, useQuery } from "@apollo/client";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import {
  Task,
  TaskListDocument,
  TaskListQuery,
  UpdateTaskDocument,
} from "../../src/generated";
import TaskDeleteButton from "./TaskDeleteButton";

/**
 * タスクリスト
 */
const TaskList: React.FC = () => {
  // タスク一覧取得初
  const { data, loading, error } = useQuery<TaskListQuery>(TaskListDocument);

  // タスク更新処理初期化
  const [updateTask, mutation] = useMutation(UpdateTaskDocument, {
    refetchQueries: [TaskListDocument],
  });

  const handleCheckboxClick = async (task: Task) => {
    // 更新処理
    await updateTask({
      variables: {
        id: task.id,
        title: task.title,
        done: !task.done,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // タスクが入れ替わるのを防ぐための処理
  const tasks = [...data?.tasks].sort((a: Task, b: Task) => b.id - a.id);

  return (
    <List>
      {tasks?.map((task) => (
        <ListItem key={task?.id}>
          <Checkbox
            colorScheme="teal"
            isChecked={task?.done}
            onChange={() => handleCheckboxClick(task)}
          >
            {task.title}
          </Checkbox>
          <TaskDeleteButton taskId={task.id} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
