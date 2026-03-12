import { sum } from "./sum"

/*
  * Unit tests for the sum function
  * describe() là một hàm dùng để nhóm các test case liên quan đến một chức năng cụ thể, trong trường hợp này là hàm sum().
  * it() là một hàm dùng để định nghĩa một test case cụ thể, trong trường hợp này là kiểm tra xem sum(2, 3) có trả về 5 hay không.
  * expect() là một hàm dùng để đưa ra các kỳ vọng về kết quả của một phép toán hoặc một hàm, 
    => trong trường hợp này là kỳ vọng rằng sum(2, 3) sẽ trả về 5.
*/
describe("UNIT TEST: SUM()", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(2, 3)).toBe(5)
  })
})