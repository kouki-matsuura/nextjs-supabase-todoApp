import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useGetTodo } from '../../features/Hooks/useGetTodo';
import { useUpdateStatus } from '../../features/Hooks/useUpdateStatus';

const ListArea : React.FC = () => {

  const {todos} = useGetTodo();
  const { handleStatus } = useUpdateStatus();
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;

        return (
          <ListItem
            key={todo.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={ () => handleStatus(todo.id, todo.is_complete)} dense>
                <Checkbox
                  checked={todo.is_complete}
                />
              <ListItemText id={labelId} primary={todo.title} />
            </ListItemButton>
            {todo.is_complete && <p>達成済み</p>}
          </ListItem>
        );
      })}
    </List>
  );
}

export default ListArea
