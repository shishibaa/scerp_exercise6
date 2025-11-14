'use client';
import { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";


type Todo = {
    id: number;
    text: string;
    status: "pending" | "completed";
}

type Filter = "all" | "pending" | "completed";


export default function TodoListpage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInput] = useState<string>("");
    const [filter, setFilter] = useState<Filter>("all");

    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "pending") return todo.status === "pending";
        if (filter === "completed") return todo.status === "completed";
        return true;
    });

    const handleAdd = () => {
        if (inputText.trim() === "") return;
        const newTodo: Todo = {
            id: Date.now(),
            text: inputText,
            status: "pending"
        };
        setTodos([...todos, newTodo]);
        setInput("");

    };

    const handleComplete = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, status: "completed" } : todo));
    };

    const handleDelete = (id: number) => {
    if (window.confirm("Delete this task?")) {
        setTodos(todos.filter(todo => todo.id !== id));
    }    };

    useEffect(() => {
        const stored = localStorage.getItem("todos");
        if (stored) {
            setTodos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);



    return (

        <div className="wrapper mx-auto my-20 rounded-3xl border-2 p-10 w-[680px] border-gray ">
            <h1 className="text-center text-3xl">To-do List</h1>
            <div className="Adding flex justify-center items-center my-5">
                <input className="px-5 py-2 rounded-xl w-[70%] mr-2 border border-gray-500 focus:border-blue-500" type="text" placeholder="Add a new task" value={inputText} onChange={(e) => setInput(e.target.value)} />
                <button
                    className="px-4 py-2 rounded-xl cursor-pointer border border-gray-800 bg-slate-900 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-1 shadow-md hover:bg-slate-800 active:scale-[0.98] transition"
                    onClick={handleAdd}
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>
            <div className="controls m-3 ">
                <div className="filters m-3 flex justify-center items-center gap-2">

                    <button
                        className={`cursor-pointer px-3 py-1 rounded-full border 
                ${filter === "all"
                                ? "bg-black text-white border-black"
                                : "text-gray-600 border-gray-300 hover:bg-gray-100"}
            `}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>

                    <button
                        className={`cursor-pointer px-3 py-1 rounded-full border 
                ${filter === "pending"
                                ? "bg-black text-white border-black"
                                : "text-gray-600 border-gray-300 hover:bg-gray-100"}
            `}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </button>

                    <button
                        className={`cursor-pointer px-3 py-1 rounded-full border 
                ${filter === "completed"
                                ? "bg-black text-white border-black"
                                : "text-gray-600 border-gray-300 hover:bg-gray-100"}
            `}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>

                </div>
            </div>


            <ul className="todos flex flex-col gap-3 ">
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className="p-2 border-b border-gray-500 flex justify-between items-center bg-white cursor-pointer hover:bg-gray-100 transition" >

                        <span className="justify-center items-center mx-5 w-[100%]" onClick={() => handleComplete(todo.id)}
                            style={{
                                textDecoration:
                                    todo.status === "completed" ? "line-through" : "none",
                                opacity: todo.status === "completed" ? 0.5 : 1,
                            }}
                        >


                            {todo.text}
                        </span>
                        <span className="buttons float-right flex ">
                            <button
                                className="px-2 py-1 mr-2 rounded-lg cursor-pointer border border-gray-800 bg-slate-900 text-white text-sm sm:text-base  flex items-center justify-center gap-1  hover:bg-slate-800 "
                                onClick={() => handleComplete(todo.id)}
                            >
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline text-[16px]">Completed</span>
                            </button>
                            <button
                                className="px-2 py-1  rounded-lg cursor-pointer border border-gray-800 bg-white text-gray-800 text-sm sm:text-base  flex items-center justify-center gap-1  hover:bg-slate-100"
                                onClick={() => handleDelete(todo.id)}
                            >
                                <span>X</span>
                                <span className="hidden sm:inline text-[16px]">Delete</span>
                            </button>
                        </span>
                    </li>


                ))}
                {filteredTodos.length === 0 && (
                    <p className="text-center text-sm text-gray-400 mt-4">
                        No tasks here yet.
                    </p>
                )}
            </ul>
        </div>
    )
}