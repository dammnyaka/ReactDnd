import {observer} from 'mobx-react-lite';
import useStore from '../../hooks/useStore'
import { Box, Grid, Paper, Typography } from '@mui/material';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import Column from './Column'
import { useCallback } from 'react';


const getListStyle = (isDraggingOver) => {
  return {
    backgroundColor: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    minHeight: 500,
  }
}


 const Dashboard = () => {

  const {boards} = useStore();

  const onDragEnd = useCallback(event => {
    const {source, destination, draggableId: taskId} = event;
    boards.active.moveTask(taskId, source, destination);
  },[boards])

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {boards.active?.sections?.map(section => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box p={1} display='flex' alignItems='center' justifyContent='center'>
                    <Typography variant='h5'>{section?.title}</Typography>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot)=> (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                        >
                         <Column section={section}/>
                         {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </DragDropContext>
    </Box>
  )

}

export default observer(Dashboard);