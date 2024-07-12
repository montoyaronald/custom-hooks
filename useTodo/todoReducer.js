export const todoReducer = ( initialState = [], action ) => {
    switch( action.type ){
      case '[TODO] Add Todo':
        return [ ...initialState, action.payload ];
      case '[TODO] Remove Todo':
        //console.log(initialState)
        return initialState.filter( (todo) => todo.id !== action.payload );
      case '[TODO] Toggle Todo':
        return initialState.map( (todo) => {
          if( todo.id === action.payload ){
            return {
              ...todo,
              done: !todo.done // Con la negacion cambia de valor si es true pasa a false y viceversa
            }
          }
          return todo;
        })
      default:
        return initialState;
    }
}