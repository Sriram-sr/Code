export interface ToDo {
    _id: string,
    text: string
}

export type RequestBody = {
    text: string
}

export type RequestParams = {
    todoId: string
}