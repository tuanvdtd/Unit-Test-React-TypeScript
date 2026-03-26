# Unit Test React TypeScript

Du an demo hoc Unit Test voi React + TypeScript + Jest. Muc tieu cua project la cung cap cac vi du nho, ro rang, de luyen:

- Test component React co tuong tac nguoi dung
- Test custom hook
- Test utility function
- Test component render
- Mock API voi fetch trong qua trinh test
- Chay test co coverage cho local va CI

## 1. Chuc nang tong quan cua du an

Trang chinh [src/App.tsx](src/App.tsx) render cac module sau de minh hoa cac tinh huong test:

- [src/components/Button/Button.tsx](src/components/Button/Button.tsx): component button tai su dung, nhan props button HTML + `content`
- [src/components/Counter/Counter.tsx](src/components/Counter/Counter.tsx): bo dem tang/ giam, co chan duoi `0` (khong am)
- [src/components/TodoList/TodoList.tsx](src/components/TodoList/TodoList.tsx): goi API danh sach todo, hien `Loading...`, `No result!`, hoac danh sach data
- [src/components/SignUpForm/SignUpForm.tsx](src/components/SignUpForm/SignUpForm.tsx): form dang ky dung `react-hook-form`, validate email va do dai password
- [src/components/DebounceSearch/DebounceSearch.tsx](src/components/DebounceSearch/DebounceSearch.tsx): tim kiem user co debounce 500ms truoc khi goi API

Ngoai ra du an co:

- [src/hooks/useCounter.ts](src/hooks/useCounter.ts): custom hook `useCounter` (increment, decrement, reset)
- [src/utils/sum.ts](src/utils/sum.ts): tinh tong 2 so
- [src/utils/validateEmail.ts](src/utils/validateEmail.ts): kiem tra email hop le va chan truong hop co `..`
- [src/utils/mapOrder.ts](src/utils/mapOrder.ts): sap xep mang object theo thu tu key trong mang thu 2

## 2. Cac file test dang cover gi

### Component tests

- [src/components/Button/Button.test.tsx](src/components/Button/Button.test.tsx): render text dung va click event duoc goi
- [src/components/Counter/Counter.test.tsx](src/components/Counter/Counter.test.tsx): tang/giam dung, khong giam duoi 0
- [src/components/TodoList/TodoList.test.tsx](src/components/TodoList/TodoList.test.tsx): loading state, data state, no result state, xu ly loi fetch
- [src/components/SignUpForm/SignUpForm.test.tsx](src/components/SignUpForm/SignUpForm.test.tsx): default values, validate form, submit thanh cong va reset form
- [src/components/DebounceSearch/DebounceSearch.test.tsx](src/components/DebounceSearch/DebounceSearch.test.tsx): debounce call, ket qua tim kiem, no result, fetch fail

### Hook test

- [src/hooks/useCounter.test.ts](src/hooks/useCounter.test.ts): gia tri khoi tao, increment, decrement (chan 0), reset

### Utility tests

- [src/utils/sum.test.ts](src/utils/sum.test.ts): phep cong co ban
- [src/utils/validateEmail.test.ts](src/utils/validateEmail.test.ts): nhieu case email hop le/khong hop le
- [src/utils/mapOrder.test.ts](src/utils/mapOrder.test.ts): case dau vao null, sap xep dung thu tu, phan tu khong co trong order dua xuong cuoi

## 3. Scripts chinh

Tu [package.json](package.json):

- `npm run dev`: chay Vite dev server
- `npm run build`: build TypeScript + Vite
- `npm run lint`: kiem tra lint
- `npm run preview`: preview ban build
- `npm run test`: chay Jest watch mode
- `npm run test:ci`: chay Jest cho CI + coverage

## 4. Cau hinh test

- [jest.config.ts](jest.config.ts):
	- `preset: ts-jest` de transpile TypeScript khi test
	- `testEnvironment: jsdom` de gia lap trinh duyet cho React component
	- `setupFilesAfterEnv` tro toi [jest.setup.ts](jest.setup.ts)
	- `moduleNameMapper` map alias `~/` -> `src/`
- [jest.setup.ts](jest.setup.ts):
	- Nap them matchers cua Testing Library (`toBeInTheDocument`, ...)
	- Mock `fetch` toan cuc
	- Clear/reset mock sau moi test

## 5. Mo ta tung goi thu vien ho tro cho Jest unit test

Duoi day la cac goi trong [package.json](package.json) lien quan truc tiep den he thong unit test:

### Nhom test runner va moi truong

- `jest`: test runner chinh, cung cap `describe`, `it/test`, `expect`, mock APIs
- `jest-environment-jsdom`: moi truong DOM gia lap cho test component React

### Nhom TypeScript cho Jest

- `ts-jest`: preset/transformer de Jest hieu va chay file `.ts/.tsx`
- `@types/jest`: type definitions cho globals cua Jest trong TypeScript
- `ts-node`: ho tro runtime TypeScript cho cac file config TypeScript (nhu `jest.config.ts`) trong mot so context

### Nhom React Testing Library

- `@testing-library/react`: render component React va truy van DOM theo hanh vi nguoi dung
- `@testing-library/dom`: cac utility query DOM nen tang ma RTL su dung
- `@testing-library/jest-dom`: bo matcher mo rong cho Jest (`toBeInTheDocument`, `toHaveTextContent`, ...)
- `@testing-library/user-event`: mo phong hanh vi user (click, type, tab...) sat thuc te hon `fireEvent`

## 6. Cac goi khac

- `react`, `react-dom`: framework va runtime duoc dem test
- `react-hook-form`: duoc test trong SignUpForm
- `lodash` (`lodash/debounce`): duoc test trong DebounceSearch
- `@types/react`, `@types/react-dom`, `@types/lodash`: bo type cho TypeScript

## 7. Yeu cau moi truong

- Node.js: `>=22.x`

## 8. Cach chay nhanh

```bash
npm install
npm run test
```

Neu muon lay coverage cho CI:

```bash
npm run test:ci
```

