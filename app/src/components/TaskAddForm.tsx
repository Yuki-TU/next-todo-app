import { useMutation } from "@apollo/client";
import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { CreateTaskDocument, TaskListDocument } from "../generated";

/**
 * タスク追加フォーム
 */
const TaskAddForm: React.FC = () => {
  // タスク追加の初期化
  const [createTask, { error }] = useMutation(CreateTaskDocument, {
    refetchQueries: [TaskListDocument], // 追加したら、クエリを際フェッチする
  });

  const handleSubmit = (title: string, resetForm: () => void) => {
    if (!title) return;

    // タイトル名でタスクを追加
    createTask({
      variables: {
        title: title,
      },
    });

    resetForm();
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(value, actions) =>
        handleSubmit(value.title, actions.resetForm)
      }
    >
      <Form>
        <Stack direction="row">
          <Field name="title">
            {
              // @ts-ignore
              ({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    placeholder="Add task"
                  />
                </FormControl>
              )
            }
          </Field>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default TaskAddForm;
