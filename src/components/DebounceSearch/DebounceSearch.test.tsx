import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DebounceSearch } from "./DebounceSearch";

describe("Component: <DebounceSearch/>", () => {
  it("should render the search input and handle user input with debounce", async () => {
    // spyon
    const fetchSpy = jest.spyOn(globalThis, "fetch");

    fetchSpy.mockImplementation( async (url: any) => {
      if (url.includes("tuandt")) {
        return {
          json: async () => [
            {
              id: 1,
              name: "TuanDT",
            }
          ]
        };
      }
      return {
        json: async () => []
      } as any;
    });

    render(<DebounceSearch />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining("users?q="));
    // giả lập người dùng nhập vào ô tìm kiếm
    userEvent.type(searchInput, "tuandt");
    // 500ms mới gọi nên hiện tại vẫn chỉ gọi 1 lần khi component được render
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    // vì chúng ta đã debounce hàm fetchUsers với thời gian 500ms, nên chúng ta cần sử dụng waitFor để chờ đợi cho đến khi hàm fetch được gọi sau khi người dùng nhập xong.
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    
    // Check if the user name is rendered
    const userName = await screen.findByText("TuanDT");
    expect(userName).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    // hàm haveBenCalledWith khác với hàm toHaveBeenLastCalledWith ở chỗ nó sẽ kiểm tra xem hàm đã được gọi với tham số nào trong tất cả các lần gọi, trong khi toHaveBeenLastCalledWith chỉ kiểm tra tham số của lần gọi cuối cùng. Trong trường hợp này, chúng ta muốn kiểm tra tham số của lần gọi cuối cùng để đảm bảo rằng nó chứa chuỗi "users?q=tuandt".
    expect(fetchSpy).toHaveBeenLastCalledWith(expect.stringContaining("users?q=tuandt"));
  });

  it("should display 'No result!' when there are no users found", async () => {
    // spyon
    const fetchSpy = jest.spyOn(globalThis, "fetch");

    fetchSpy.mockImplementation( async (url: any) => {
      if (url.includes("tuandt")) {
        return {
          json: async () => []
        };
      } return {
        json: async () => []
      } as any;
    });

    render(<DebounceSearch />);
    const searchInput = screen.getByPlaceholderText("Search");
    userEvent.type(searchInput, "tuandt");
    expect(await screen.findByText("No result!")).toBeInTheDocument();
  });

  it('should render loading and no result when fetch api fail', async () => {
      const fetchMock = jest.spyOn(globalThis, 'fetch');
      // cần dùng mockRejectedValueOnce để trả về lỗi giả lập khi fetch được dữ liệu thất bại
      fetchMock.mockRejectedValueOnce(new Error('Failed to search'))
      render(<DebounceSearch />)
  
      expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    });
});