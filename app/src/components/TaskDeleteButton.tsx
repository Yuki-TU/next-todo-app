import { useMutation } from "@apollo/client";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { DeleteTaskDocument, TaskListDocument } from "../generated";

/**
 * 削除ボタン
 * @param param0 削除したいタスクid
 */
const TaskDeleteButton: React.FC<{ taskId: number }> = ({ taskId }) => {
  const [deleteTask, { error }] = useMutation(DeleteTaskDocument, {
    refetchQueries: [TaskListDocument], // 削除した後に、タスク一覧を取得
  });

  const handleClick = () => {
    deleteTask({
      variables: {
        id: taskId,
      },
    });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <IconButton
        aria-label="tasl delete button"
        icon={<SmallCloseIcon />}
        variant="ghost"
        color="gray.200"
        _hover={{ bg: "none", color: "gray" }}
        _focus={{ boxShadow: "none" }}
        onClick={() => handleClick()}
      />
    </Box>
  );
};

export default TaskDeleteButton;
