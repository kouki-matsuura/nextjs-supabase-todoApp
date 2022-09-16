
import StyledButton from "../atoms/Button";
import { useAddTodo } from "../../features/Hooks/useAddTodo";
import styled from "styled-components"
const NewTodoForm = () => {
    const { title, setTitle, handleSubmit } = useAddTodo();  
    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <StyledButton type="submit">送信</StyledButton>
        </form>
    )
}

const StyledNewTodoForm = styled(NewTodoForm)`
    margin-top: 20px;
    color: black;
`;

export default StyledNewTodoForm;
