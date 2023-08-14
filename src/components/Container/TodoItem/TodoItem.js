import { useEffect, useRef, useState, useCallback, memo } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "~/App";

import classNames from "classnames/bind";
import styles from './TodoItem.module.scss';

const cx = classNames.bind(styles);

function TodoItem({ content, id, todoList, setTodoList }) {

    const [theme] = useContext(ThemeContext)

    const [valueChange, setValueChange] = useState(content)

    const [checked, setChecked] = useState(false)

    const valueChangeRef = useRef()

    const handleValueChange = e => setValueChange(e.target.value)

    // PUT
    const handleUpdate = (id) => {

        setChecked(checked => !checked)

        if (!checked)
            return

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: valueChangeRef.current.value })
        };

        fetch('http://localhost:3000/todos' + '/' + id, options)
            .then(res => res.json())
            .then(data => {
                if (!data.content.trim()) {
                    setValueChange('undefined')
                }
            })
    }

    // DELETE
    const handleDelete = (id) => {

        const options = {
            method: 'DELETE'
        };

        fetch('http://localhost:3000/todos' + '/' + id, options)
            .then(res => res.json())
            .then(() => {
                const newTodoList = todoList.filter((current) => (current.id !== id));
                setTodoList(() => newTodoList);
            })
    }

    useEffect(() => {
        if (checked)
            valueChangeRef.current.focus();
    }, [checked])

    return (
        <div className={cx('todo-block', theme)}>
            {!checked &&
                <li className={cx('todo-item')}>{valueChange}</li>
            }
            {checked &&
                <input
                    className={cx('todo-item', 'change')}
                    ref={valueChangeRef}
                    value={valueChange}
                    placeholder='Change a todo...'
                    onChange={handleValueChange}
                />
            }
            <button
                className={cx('update-btn', '-btn', theme)}
                onClick={() => handleUpdate(id)}

            >
                {!checked && <FontAwesomeIcon icon={faPen} />}
                {checked && <FontAwesomeIcon icon={faSave} />}
            </button>
            <button
                className={cx('delete-btn', '-btn', theme)}
                onClick={() => handleDelete(id)}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </div>
    );
}

export default memo(TodoItem);