import { writable } from "svelte/store";

import type Todo from "$lib/records/Todo";

export const todos = writable<Todo[]>([]);
