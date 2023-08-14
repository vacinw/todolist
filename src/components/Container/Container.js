import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPlusSquare, faSun } from "@fortawesome/free-solid-svg-icons";

import { TodoItem } from "./TodoItem";
import { ThemeContext } from "~/App";

import classNames from "classnames/bind";
import styles from './Container.module.scss';

const cx = classNames.bind(styles);

function Container() {
    const [theme, setTheme] = useContext(ThemeContext)

    const [todo, setTodo] = useState('');

    const [todoList, setTodoList] = useState([])

    const inputRef = useRef()

    const handleChange = e => setTodo(e.target.value);

    const handleToggleTheme = () => {
        setTheme(theme => {
            switch (theme) {
                case 'light':
                    return 'dark'
                case 'dark':
                    return 'light'
                default:
                    return new Error('Undefined theme')
            }
        })
    }

    // GET
    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(res => res.json())
            .then(data => setTodoList(data))
    }, [])

    // POST
    const handleCreate = () => {
        if (todo.trim() === '')
            return

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: inputRef.current.value })
        };

        fetch('http://localhost:3000/todos', options)
            .then(res => res.json())
            .then(data => {
                setTodoList(prev => [...prev, data])
                setTodo('');
                inputRef.current.focus();
            })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>TODO</h1>
                <button
                    className={cx('toggle-theme')}
                    onClick={handleToggleTheme}
                >
                    {(theme === 'light') &&
                        <FontAwesomeIcon className={cx('theme-icon', 'light')} icon={faMoon} />
                    }
                    {!(theme === 'light') &&
                        <FontAwesomeIcon className={cx('theme-icon', 'dark')} icon={faSun} />
                    }
                </button>
            </div>
            <div className={cx('create', theme)}>
                <input
                    ref={inputRef}
                    className={cx('input')}
                    value={todo}
                    onChange={handleChange}
                    placeholder='Create a new todo...'
                />
                <button
                    className={cx('create-btn', theme)}
                    onClick={handleCreate}
                >
                    <FontAwesomeIcon icon={faPlusSquare} />
                </button>
            </div>
            <div className={cx('result')}>
                {todoList.length === 0 && <span className={cx('empty-result', theme)}>Nothing to do...</span>}
                <ul className={cx('todo-list')}>
                    {todoList.map((({ id, content }) => {
                        return (
                            <TodoItem
                                key={id}
                                id={id}
                                content={content}
                                todoList={todoList}
                                setTodoList={setTodoList}
                            />
                        )
                    }))}
                </ul>
            </div >

        </div >
    );
}

export default Container;