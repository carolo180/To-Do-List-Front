import React, { useState, useEffect } from 'react'
import todos from "./apiConnect";
import Form from "./components/Form";
import Section from "./components/Section";
import List from "./components/List";
import "./App.css"
import pen from "./assets/pen.svg"

const appTitle = "My Schedule";

const App = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get("/todos");
            setTodoList(data);
        }

        fetchData();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post("/todos/new", item);
        setTodoList((oldList) => [...oldList, data]);
    };

    const removeTodo = async (id) => {
        await todos.delete(`/todos/${id}`);
        setTodoList((oldList) => oldList.filter((item) => item._id !== id));
    };

    const editTodo = async (id, item) => {
        await todos.put(`/todos/${id}`, item);
    };

    return (
        <div className="ui container center aligned back">
            <Section>
                <h1 className='titulo'>{appTitle}</h1>
                <img src={pen} width="30px"/>
            </Section>

            <Section>
                <Form addTodo={addTodo} />
            </Section>

            <Section>
                <List
                    editTodoListProp={editTodo}
                    removeTodoListProp={removeTodo}
                    list={todoList}
                />
            </Section>
        </div>
    );
};

export default App;