import { TodoList } from "./TodoList";
import { screen, render } from "@testing-library/react";

const mockTodos = {
  todos: [
    {
      "id": 1,
      "todo": "Do something nice for someone you care about",
      "completed": false,
      "userId": 152
    },
    {
      "id": 2,
      "todo": "Memorize a poem",
      "completed": true,
      "userId": 13
    },
  ]
}

describe('Component: <TodoList/>', () => {

  it('should render loading  and data when fetch api success', async () => {

    // spyOn khác với fn ở chỗ nó sẽ là hàm dùng để theo dõi các hàm async như fetch, axios,... và có thể mock trả về dữ liệu giả lập khi hàm đó được gọi, còn fn thì chỉ là hàm bình thường dùng để mock các hàm sync như onClick, onChange,...
    const fetchMock = jest.spyOn(globalThis, 'fetch');
    // cần dùng mockResolvedValueOnce để trả về dữ liệu giả lập khi fetch được dữ liệu thành công
    fetchMock.mockResolvedValueOnce({
      // json.mockResolvedValueOnce để trả về dữ liệu giả lập khi json được gọi, và mockTodos là dữ liệu giả lập mà chúng ta đã định nghĩa ở trên
      json: jest.fn().mockResolvedValueOnce(mockTodos)
    } as any)
    render(<TodoList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    for (const t of mockTodos.todos) {
      expect(await screen.findByText(t.todo)).toBeInTheDocument()
    }
  });

  it('should render loading and no result when fetch api success but data is empty', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch');
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ todos: [] })
    } as any)
    render(<TodoList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(await screen.findByText('No result!')).toBeInTheDocument()
  });

  it('should render loading and no result when fetch api fail', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch');
    // cần dùng mockRejectedValueOnce để trả về lỗi giả lập khi fetch được dữ liệu thất bại
    fetchMock.mockRejectedValueOnce(new Error('Failed to fetch'))
    render(<TodoList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  });

});