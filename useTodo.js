import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

// todos, handleNewTodo, handleRemoveTodo, handleToggleTodo
export const useTodo = () => {

    const inistialState = [];

    // Funcion que inicia el reducer (Tercer parametro de useReducer)
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    /**
     *  useReducer: Parametros
        todoReducer: La función reductora que debe devolver el estado inicial. Debe ser pura, debe tomar el estado y la acción como argumentos,
        y debe devolver el siguiente estado. El estado y la acción pueden ser de cualquier tipo.
        inistialState: El valor a partir del cual se calcula el estado inicial.
        Puede ser un valor de cualquier tipo. Cómo se calcula el estado inicial depende del siguiente argumento init.
        opcional init: La función inicializadora que especifica cómo se calcula el estado inicial.
        Si no se especifica, el estado inicial se establece en initialArg. En caso contrario,
        el estado inicial es el resultado de llamar a init(initialArg).
     */
        const [ todos, dispatch ] = useReducer(todoReducer, inistialState, init);

    // Cuando 'todos' cambie ejecutamos un efecto secundario
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleRemoveTodo = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch( action );
    }

    const handleToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch( action );
    }

    const todosCount = () => {
        return todos.length;
    }

    const todosPendingTodos = () => {
        return todos.filter( todo => !todo.done).length;
    }

    return {
        todos,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,
        todosCount,
        todosPendingTodos,
    }

}